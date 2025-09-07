const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['super_admin', 'franchise_admin', 'cart_admin'],
        required: true,
    },
    franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
}, { timestamps: true });

// Hash password before saving the user model
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// THIS IS THE CRUCIAL LINE:
module.exports = mongoose.model('User', userSchema);
