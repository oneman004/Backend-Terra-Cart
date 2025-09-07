// scripts/setupSuperAdmin.js
const path = require('path'); // <-- Add this line
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Use path.resolve to create a robust, absolute path to the User model
const User = require(path.resolve(__dirname, '../models/User'));

// Correctly point to the .env file in the project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        // Check if the MONGO_URI is loaded
        if (!process.env.MONGO_URI) {
            console.error('Error: MONGO_URI is not defined in your .env file.');
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for script...');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

const createAdmin = async () => {
    await connectDB();

    try {
        // Verify that environment variables are loaded
        if (!process.env.SUPER_ADMIN_EMAIL || !process.env.SUPER_ADMIN_PASSWORD || !process.env.SUPER_ADMIN_NAME) {
             console.error('Error: Please ensure SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, and SUPER_ADMIN_NAME are set in your .env file.');
             process.exit(1);
        }

        const adminExists = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });

        if (adminExists) {
            console.log('Super admin already exists.');
            process.exit();
        }

        const admin = await User.create({
            name: process.env.SUPER_ADMIN_NAME,
            email: process.env.SUPER_ADMIN_EMAIL,
            password: process.env.SUPER_ADMIN_PASSWORD,
            role: 'super_admin',
        });

        console.log('Super admin created successfully!');
        console.log(`Email: ${admin.email}`);
        console.log('Password: The one you set in your .env file');
        process.exit();

    } catch (error) {
        console.error('Error creating super admin:', error);
        process.exit(1);
    }
};

createAdmin();
