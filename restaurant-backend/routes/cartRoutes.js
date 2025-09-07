const express = require('express');
const router = express.Router();
const {
    createCart,
    getCartsForMyFranchise,
    updateCart,
} = require('../controllers/cartController');
const { protect, isFranchiseAdmin } = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(protect, isFranchiseAdmin);

router.route('/')
    .post(createCart);

router.get('/my-franchise', getCartsForMyFranchise);

router.route('/:id')
    .put(updateCart);

module.exports = router;
