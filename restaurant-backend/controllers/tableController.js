// controllers/tableController.js
const Table = require('../models/Table');
const Cart = require('../models/Cart');
const { v4: uuidv4 } = require('uuid'); // Import the UUID library

/**
 * @desc    Create a new table for a specific cart
 * @route   POST /api/tables
 * @access  Private/Admins (Cart Admin, Franchise Admin, Super Admin)
 */
const createTable = async (req, res) => {
    const { tableNumber, capacity, cartId } = req.body;
    const user = req.user;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // Security check: Admins can only add tables to carts they have permission for.
        if (user.role === 'franchise_admin' && cart.franchiseId.toString() !== user.franchiseId.toString()) {
            return res.status(403).json({ message: 'Forbidden: You can only manage tables for your own franchise.' });
        }
        if (user.role === 'cart_admin' && cartId !== user.cartId.toString()) {
            return res.status(403).json({ message: 'Forbidden: You can only manage tables for your own cart.' });
        }

        const table = new Table({
            tableNumber,
            capacity,
            qrCodeIdentifier: uuidv4(), // Generate a unique identifier for the QR code
            cartId,
        });

        const createdTable = await table.save();
        res.status(201).json(createdTable);

    } catch (error) {
        console.error('TABLE CREATION ERROR:', error);
        res.status(500).json({ message: 'Error creating table', error: error.message });
    }
};

/**
 * @desc    Get all tables for a specific cart
 * @route   GET /api/tables/cart/:cartId
 * @access  Private/Admins
 */
const getTablesForCart = async (req, res) => {
    const { cartId } = req.params;
    // Note: In a production app, you would add security checks here too.
    try {
        const tables = await Table.find({ cartId: cartId });
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tables', error: error.message });
    }
};

// Functions like updateTableDetails and deleteTable would be added here.

module.exports = { createTable, getTablesForCart };
