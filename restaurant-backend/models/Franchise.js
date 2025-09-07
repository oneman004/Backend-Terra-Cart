const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gstNumber: { type: String },
    address: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// THIS IS THE CRUCIAL LINE.
// It compiles the schema into a model and exports it directly.
module.exports = mongoose.model('Franchise', franchiseSchema);
