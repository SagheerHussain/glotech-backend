const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  createStats,
  getStats,
  getStatsById,
  updateStats,
  deleteStats,
} = require('../controllers/stats.Controller');

// Routes for the ServiceStats CRUD operations
router.post('/', createStats); // Create service stats
router.get('/', getStats); // Get all service stats
router.get('/get/:id', getStatsById); // Get a specific service stats by ID
router.put('/update/:id', updateStats); // Update service stats by ID
router.delete('/delete/:id', deleteStats); // Delete service stats by ID

module.exports = router;
