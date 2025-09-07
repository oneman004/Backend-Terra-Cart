const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // Check if JWT_SECRET is loaded
    if (!process.env.JWT_SECRET) {
        console.error('FATAL ERROR: JWT_SECRET is not defined in .env file.');
        // In a real app, you might want to exit the process
        // process.exit(1); 
        // For now, we'll throw an error that the controller can catch.
        throw new Error('JWT Secret is not configured.');
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '365d', // Add a default expiration
    });
};

// This is the crucial line. It exports the function itself, not an object containing the function.
module.exports = generateToken;
