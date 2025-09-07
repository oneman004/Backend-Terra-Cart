const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    franchiseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Franchise',
        required: true,
    },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// This is the crucial line.
// It compiles the schema into a model and exports the model itself.
module.exports = mongoose.model('Cart', cartSchema);
