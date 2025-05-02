const express = require('express');
const router = express.Router();
const upload = require('../upload');
// Import the controller functions
const { createService, getServices, getService, updateService, deleteService } = require('../controllers/service.Controller');

// Routes for the Service CRUD operations
router.post('/', upload.array("images", 2), createService); // Create a new service
router.get('/', getServices); // Get all services
router.get('/:id', getService); // Get a specific service by ID
router.put('/:id', updateService); // Update a service by ID
router.delete('/:id', deleteService); // Delete a service by ID

module.exports = router;
