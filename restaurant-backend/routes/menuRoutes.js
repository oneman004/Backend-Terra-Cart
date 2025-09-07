// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const { createMenuItem, getMenuForCart } = require('../controllers/menuController');
const { protect, isCartAdmin } = require('../middleware/authMiddleware');

// This route is public so customers can see the menu without logging in.
router.get('/cart/:cartId', getMenuForCart);

// This route is protected so only admins can create new items.
router.post('/', protect, isCartAdmin, createMenuItem);

module.exports = router;
