// controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for user by email
        const user = await User.findOne({ email });

        // IMPORTANT: We check if a user was found BEFORE trying to match the password.
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                franchiseId: user.franchiseId,
                cartId: user.cartId,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // THIS IS THE NEW, IMPORTANT LINE FOR DEBUGGING
        console.error('LOGIN ERROR:', error); 
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = async (req, res) => {
    // The `protect` middleware already attached the user object to `req`
    res.status(200).json(req.user);
};


module.exports = { login, getCurrentUser };
