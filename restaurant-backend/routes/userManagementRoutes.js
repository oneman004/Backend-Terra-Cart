const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userManagementController');
const { protect, isFranchiseAdmin } = require('../middleware/authMiddleware');

router.use(protect, isFranchiseAdmin);

router.route('/').post(createUser);

module.exports = router;
