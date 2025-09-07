// controllers/userManagementController.js
const User = require('../models/User');

/**
 * @desc    Create a new user (Franchise Admin or Cart Admin)
 * @route   POST /api/users
 * @access  Private/Admins
 */
const createUser = async (req, res) => {
    const { name, email, password, role, franchiseId, cartId } = req.body;
    const creatingUser = req.user; // The user making the request (from the 'protect' middleware)

    // Rule 1: Only a Super Admin can create a Franchise Admin.
    if (role === 'franchise_admin' && creatingUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to create Franchise Admins.' });
    }

    // Rule 2: Only a Super Admin or Franchise Admin can create a Cart Admin.
    if (role === 'cart_admin' && !['super_admin', 'franchise_admin'].includes(creatingUser.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to create Cart Admins.' });
    }

    // Rule 3: A Franchise Admin can only create users for their own franchise.
    if (creatingUser.role === 'franchise_admin' && creatingUser.franchiseId.toString() !== franchiseId) {
        return res.status(403).json({ message: 'Forbidden: You can only create users within your own franchise.' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            franchiseId: role === 'super_admin' ? null : franchiseId,
            cartId: role === 'cart_admin' ? cartId : null,
        });

        // Send back a clean user object without the password
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            franchiseId: user.franchiseId,
            cartId: user.cartId,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during user creation.', error: error.message });
    }
};

// We will add functions like getUsersForMyFranchise and deactivateUser here later.

module.exports = { createUser };
