const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    priceAtOrder: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', orderItemSchema);
