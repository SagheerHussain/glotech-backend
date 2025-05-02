const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  createServiceStats,
  getServiceStats,
  getServiceStatsById,
  updateServiceStats,
  deleteServiceStats,
} = require('../controllers/stats.Controller');

// Routes for the ServiceStats CRUD operations
router.post('/', createServiceStats); // Create service stats
router.get('/', getServiceStats); // Get all service stats
router.get('/:id', getServiceStatsById); // Get a specific service stats by ID
router.put('/:id', updateServiceStats); // Update service stats by ID
router.delete('/:id', deleteServiceStats); // Delete service stats by ID

module.exports = router;
