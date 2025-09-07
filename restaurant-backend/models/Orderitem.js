const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    quantity: { type: Number, required: true },
    priceAtOrder: { type: mongoose.Decimal128, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
