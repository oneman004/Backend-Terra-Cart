// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder, updateOrderStatus } = require('../controllers/orderController');
const { protect, isCartAdmin } = require('../middleware/authMiddleware');

// Public route for customers to place an order
router.route('/').post(placeOrder);

// Protected route for admins to update an order's status
router.route('/:orderId/status').put(protect, isCartAdmin, updateOrderStatus);

module.exports = router;
