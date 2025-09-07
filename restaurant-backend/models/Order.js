const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['new', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'new',
    },
    totalAmount: { type: mongoose.Decimal128, required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
}, { timestamps: { createdAt: 'orderTimestamp' } });

module.exports = mongoose.model('Order', orderSchema);
