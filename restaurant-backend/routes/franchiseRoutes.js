const express = require('express');
const router = express.Router();
const {
    createFranchise,
    getAllFranchises,
    updateFranchise,
} = require('../controllers/franchiseController');
const { protect, isSuperAdmin } = require('../middleware/authMiddleware');

router.use(protect, isSuperAdmin);

router.route('/')
    .post(createFranchise)
    .get(getAllFranchises);

router.route('/:id')
    .put(updateFranchise);

module.exports = router;
