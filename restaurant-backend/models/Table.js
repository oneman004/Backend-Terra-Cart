const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'reserved'],
        default: 'available',
    },
    qrCodeIdentifier: {
        type: String,
        required: true,
        unique: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
}, { timestamps: true });

// This is the crucial line that exports the compiled model.
module.exports = mongoose.model('Table', tableSchema);
