const express = require('express');
const router = express.Router();
const { login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/me', protect, getCurrentUser);

module.exports = router;
