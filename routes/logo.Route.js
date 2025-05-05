const express = require('express');
const router = express.Router();
const upload = require('../upload');

// Import the controller functions
const { createLogo, getLogo, getLogoById, updateLogo, deleteLogo } = require('../controllers/logo.Controller');

// Routes for the Logo CRUD operations
router.post('/', upload.single('image'), createLogo); // Create a new logo
router.get('/', getLogo); // Get all logos
router.get('/get/:id', getLogoById); // Get a specific logo by ID
router.put('/update/:id', upload.single('image'), updateLogo); // Update a logo by ID
router.delete('/delete/:id', deleteLogo); // Delete a logo by ID

module.exports = router;
