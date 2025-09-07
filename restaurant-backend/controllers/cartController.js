const Cart = require('../models/Cart');
const Franchise = require('../models/Franchise');

/**
 * @desc    Create a new cart for a franchise
 * @route   POST /api/carts
 * @access  Private/FranchiseAdmin
 */
const createCart = async (req, res) => {
    const { name, address, franchiseId } = req.body;
    const user = req.user;

    // Security check: A franchise admin can only create carts for their own franchise.
    if (user.role === 'franchise_admin' && user.franchiseId.toString() !== franchiseId) {
        return res.status(403).json({ message: 'Forbidden: You can only create carts for your assigned franchise.' });
    }

    try {
        const franchise = await Franchise.findById(franchiseId);
        if (!franchise) {
            return res.status(404).json({ message: 'Franchise not found.' });
        }

        const cart = new Cart({
            name,
            address,
            franchiseId,
        });

        const createdCart = await cart.save();
        res.status(201).json(createdCart);
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart', error: error.message });
    }
};

/**
 * @desc    Get all carts for the logged-in user's franchise
 * @route   GET /api/carts/my-franchise
 * @access  Private/FranchiseAdmin
 */
const getCartsForMyFranchise = async (req, res) => {
    try {
        const carts = await Cart.find({ franchiseId: req.user.franchiseId });
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carts', error: error.message });
    }
};

/**
 * @desc    Update a cart's details
 * @route   PUT /api/carts/:id
 * @access  Private/FranchiseAdmin
 */
const updateCart = async (req, res) => {
    const { name, address } = req.body;

    try {
        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Security check: Ensure the cart belongs to the admin's franchise
        if (cart.franchiseId.toString() !== req.user.franchiseId.toString()) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to update this cart.' });
        }

        cart.name = name ?? cart.name;
        cart.address = address ?? cart.address;

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

module.exports = {
    createCart,
    getCartsForMyFranchise,
    updateCart,
};
