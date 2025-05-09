const express = require('express');
const router = express.Router();
const upload = require('../upload');
// Import the controller functions
const { createService, getServices, getService, updateService, deleteService, getServiceByCategory } = require('../controllers/service.Controller');

// Routes for the Service CRUD operations
router.post('/', upload.array("images"), createService); // Create a new service
router.get('/', getServices); // Get all services
router.get('/get/:id', getService); // Get a specific service by ID
router.get('/category/:category', getServiceByCategory); // Get a specific service by category
router.put('/update/:id', upload.array("images"), updateService); // Update a service by ID
router.delete('/delete/:id', deleteService); // Delete a service by ID

module.exports = router;
