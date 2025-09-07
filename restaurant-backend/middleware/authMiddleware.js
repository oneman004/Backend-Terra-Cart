// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes for logged-in users
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token's ID and attach to request object
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware for role-based access
const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'super_admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden. Super admin access required.' });
    }
};

const isFranchiseAdmin = (req, res, next) => {
    // A super admin should also have franchise admin rights
    if (req.user && (req.user.role === 'franchise_admin' || req.user.role === 'super_admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden. Franchise admin access required.' });
    }
};

const isCartAdmin = (req, res, next) => {
    // Admins of higher levels should also have cart admin rights
    if (req.user && ['cart_admin', 'franchise_admin', 'super_admin'].includes(req.user.role)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden. Cart admin access required.' });
    }
};


module.exports = { protect, isSuperAdmin, isFranchiseAdmin, isCartAdmin };
