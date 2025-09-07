const Menu = require('../models/Menu');
const Cart = require('../models/Cart');

/**
 * @desc    Create a new menu item for a cart
 * @route   POST /api/menu
 * @access  Private/Admins
 */
const createMenuItem = async (req, res) => {
    const { name, description, price, category, cartId } = req.body;
    // Note: In a production app, you would add security checks here
    // to ensure the user has permission to add to this cart.

    try {
        const menuItem = new Menu({
            name,
            description,
            price,
            category,
            cartId,
        });

        const createdItem = await menuItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating menu item', error: error.message });
    }
};

/**
 * @desc    Get all available menu items for a specific cart
 * @route   GET /api/menu/cart/:cartId
 * @access  Public
 */
const getMenuForCart = async (req, res) => {
    try {
        const menuItems = await Menu.find({ cartId: req.params.cartId, isAvailable: true });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error: error.message });
    }
};

// This export block makes both functions available for import in other files.
module.exports = {
    createMenuItem,
    getMenuForCart,
};
