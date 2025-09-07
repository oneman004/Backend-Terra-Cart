// controllers/orderController.js
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Customer = require('../models/Customer');
const Table = require('../models/Table');
const Menu = require('../models/Menu');

/**
 * @desc    Place a new order
 * @route   POST /api/orders
 * @access  Public
 */
const placeOrder = async (req, res) => {
    const { customerDetails, items, tableIdentifier } = req.body; // { name, phone }, [{menuId, quantity}], qrCodeIdentifier

    try {
        // 1. Find the table and cart by the QR code identifier
        const table = await Table.findOne({ qrCodeIdentifier: tableIdentifier });
        if (!table) {
            return res.status(404).json({ message: 'Table not found. Invalid QR code.' });
        }
        const cartId = table.cartId;

        // 2. Create or find the customer
        let customer = await Customer.findOneAndUpdate(
            { phone: customerDetails.phone },
            { name: customerDetails.name },
            { new: true, upsert: true } // Creates a new customer if not found
        );

        // 3. Calculate total amount and validate menu items
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            const menuItem = await Menu.findById(item.menuId);
            if (!menuItem) {
                return res.status(400).json({ message: `Menu item with ID ${item.menuId} not found.` });
            }
            if (menuItem.cartId.toString() !== cartId.toString()) {
                return res.status(400).json({ message: `Menu item ${menuItem.name} does not belong to this restaurant.`});
            }
            const price = parseFloat(menuItem.price.toString());
            totalAmount += item.quantity * price;
            orderItemsData.push({
                quantity: item.quantity,
                priceAtOrder: price,
                menuId: item.menuId
            });
        }
        
        // 4. Create the main Order
        const order = new Order({
            totalAmount,
            cartId,
            tableId: table._id,
            customerId: customer._id,
            status: 'new',
        });
        const createdOrder = await order.save();

        // 5. Create the associated OrderItems
        for (const itemData of orderItemsData) {
            itemData.orderId = createdOrder._id;
            await OrderItem.create(itemData);
        }

        // 6. REAL-TIME MAGIC: Emit an event to the specific cart's room
        const io = req.io;
        io.to(`cart_${cartId}`).emit('new_order_placed', { orderId: createdOrder._id, tableNumber: table.tableNumber });

        // 7. Update table status and emit another event
        table.status = 'occupied';
        await table.save();
        io.to(`cart_${cartId}`).emit('table_status_updated', { tableId: table._id, status: 'occupied' });

        res.status(201).json({ success: true, message: 'Order placed successfully!', orderId: createdOrder._id });

    } catch (error) {
        console.error("ORDER PLACEMENT ERROR:", error);
        res.status(500).json({ message: "Server error while placing order.", error: error.message });
    }
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:orderId/status
 * @access  Private/Admins
 */
const updateOrderStatus = async (req, res) => {
    const { newStatus } = req.body;
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.status = newStatus;
        await order.save();

        // REAL-TIME MAGIC: Emit an event to notify of the status change
        const io = req.io;
        io.to(`cart_${order.cartId}`).emit('order_status_updated', { orderId: order._id, status: newStatus });

        // If order is completed, also free up the table
        if (newStatus === 'completed' || newStatus === 'cancelled') {
            await Table.findByIdAndUpdate(order.tableId, { status: 'available' });
            io.to(`cart_${order.cartId}`).emit('table_status_updated', { tableId: order.tableId, status: 'available' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("STATUS UPDATE ERROR:", error);
        res.status(500).json({ message: "Server error while updating status.", error: error.message });
    }
};

module.exports = { placeOrder, updateOrderStatus };
