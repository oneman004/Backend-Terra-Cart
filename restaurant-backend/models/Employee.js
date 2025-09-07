const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., 'Waiter', 'Chef'
    phone: { type: String },
    email: { type: String },
    isActive: { type: Boolean, default: true },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart',
    },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
