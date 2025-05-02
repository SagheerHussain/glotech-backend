const express = require('express');
const router = express.Router();

// Import the controller functions
const { createColor, getColors, getColor, updateColor, deleteColor } = require('../controllers/color.Controller');

// Routes for the Color CRUD operations
router.post('/', createColor); // Create new color settings
router.get('/', getColors); // Get all color settings
router.get('/get/:id', getColor); // Get a specific color setting by ID
router.put('/update/:id', updateColor); // Update color settings by ID
router.delete('/delete/:id', deleteColor); // Delete color settings by ID

module.exports = router;
