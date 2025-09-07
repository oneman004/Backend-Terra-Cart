const Franchise = require('../models/Franchise');

/**
 * @desc    Create a new franchise
 * @route   POST /api/franchises
 * @access  Private/SuperAdmin
 */
const createFranchise = async (req, res) => {
    const { name, gstNumber, address } = req.body;

    try {
        const franchise = new Franchise({
            name,
            gstNumber,
            address,
        });

        const createdFranchise = await franchise.save();
        res.status(201).json(createdFranchise);
    } catch (error) {
        res.status(500).json({ message: 'Error creating franchise', error: error.message });
    }
};

/**
 * @desc    Get all franchises
 * @route   GET /api/franchises
 * @access  Private/SuperAdmin
 */
const getAllFranchises = async (req, res) => {
    try {
        const franchises = await Franchise.find({});
        res.status(200).json(franchises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching franchises', error: error.message });
    }
};

/**
 * @desc    Update a franchise's details or status
 * @route   PUT /api/franchises/:id
 * @access  Private/SuperAdmin
 */
const updateFranchise = async (req, res) => {
    const { name, gstNumber, address, isActive } = req.body;

    try {
        const franchise = await Franchise.findById(req.params.id);

        if (franchise) {
            franchise.name = name ?? franchise.name;
            franchise.gstNumber = gstNumber ?? franchise.gstNumber;
            franchise.address = address ?? franchise.address;
            franchise.isActive = isActive ?? franchise.isActive;

            const updatedFranchise = await franchise.save();
            res.status(200).json(updatedFranchise);
        } else {
            res.status(404).json({ message: 'Franchise not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating franchise', error: error.message });
    }
};

// This is the complete export block
module.exports = {
    createFranchise,
    getAllFranchises,
    updateFranchise,
};
