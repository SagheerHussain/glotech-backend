const express = require('express');
const router = express.Router();

// Import the controller functions
const { createLogo, getLogo, updateLogo, deleteLogo } = require('../controllers/logo.Controller');

// Routes for the Logo CRUD operations
router.post('/', createLogo); // Create a new logo
router.get('/:id', getLogo); // Get a specific logo by ID
router.put('/:id', updateLogo); // Update a logo by ID
router.delete('/:id', deleteLogo); // Delete a logo by ID

module.exports = router;
