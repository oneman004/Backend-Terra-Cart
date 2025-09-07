// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const { createTable, getTablesForCart } = require('../controllers/tableController');
const { protect, isCartAdmin } = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(protect, isCartAdmin);

router.route('/').post(createTable);
router.get('/cart/:cartId', getTablesForCart);

module.exports = router;
