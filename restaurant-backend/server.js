const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// --- Initialize Express App ---
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse incoming JSON requests

// --- Create HTTP Server and Integrate Socket.IO ---
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // In production, restrict this to your frontend's URL
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- Socket.IO Connection Handler ---
io.on('connection', (socket) => {
    console.log('A user connected via WebSocket:', socket.id);

    // Handler for clients joining a specific cart's room
    socket.on('join_cart_room', (cartId) => {
        socket.join(`cart_${cartId}`);
        console.log(`Socket ${socket.id} joined room: cart_${cartId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// --- Custom Middleware ---
// This middleware makes the `io` instance available on the `req` object
// for all our controllers to use for emitting real-time events.
// It MUST be defined BEFORE the API routes.
app.use((req, res, next) => {
    req.io = io;
    next();
});

// --- API Route Definitions ---
const authRoutes = require('./routes/authRoutes');
const franchiseRoutes = require('./routes/franchiseRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
const cartRoutes = require('./routes/cartRoutes');
const tableRoutes = require('./routes/tableRoutes'); // <-- Add
const menuRoutes = require('./routes/menuRoutes');   // <-- Add
const orderRoutes = require('./routes/orderRoutes'); // <-- Add

app.use('/api/auth', authRoutes);
app.use('/api/franchises', franchiseRoutes);
app.use('/api/users', userManagementRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/tables', tableRoutes); // <-- Add
app.use('/api/menu', menuRoutes);     // <-- Add
app.use('/api/orders', orderRoutes);  // <-- Add

// A simple root endpoint to check if the API is running
app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is active and listening on port ${PORT}`));

// --- Graceful Shutdown on Process Interruption ---
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
});
