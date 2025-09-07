const mongoose = require('mongoose');

// Define the menu item schema
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

// THIS LINE EXPORTS THE CONSTRUCTOR FUNCTION!
module.exports = mongoose.model('Menu', menuSchema);
