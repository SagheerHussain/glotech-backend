const express = require('express');
const router = express.Router();

// Import the controller functions
const { createOverallStats, getOverallStats, getOverallStatsById, updateOverallStats, deleteOverallStats } = require('../controllers/overallStats.Controller');

// Routes for the OverallStats CRUD operations
router.post('/', createOverallStats); // Create overall stats
router.get('/', getOverallStats); // Get all overall stats
router.get('/get/:id', getOverallStatsById); // Get a specific overall stats by ID
router.put('/update/:id', updateOverallStats); // Update overall stats by ID
router.delete('/delete/:id', deleteOverallStats); // Delete overall stats by ID

module.exports = router;
