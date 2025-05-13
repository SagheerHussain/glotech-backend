const express = require("express");
const router = express.Router();
const upload = require('../upload');

// Import the controller functions
const {
  createTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
  getTechnologiesByCategory,
} = require('../controllers/technology.controller');

// Routes for the Technology CRUD operations
router.post('/', upload.array("images"), createTechnology); // Create technology
router.get('/', getTechnologies); // Get all technologies
router.get('/get/:id', getTechnologyById); // Get a specific technology by ID
router.put('/update/:id', upload.array("images"), updateTechnology); // Update technology by ID
router.delete('/delete/:id', deleteTechnology); // Delete technology by ID
router.get('/category/:category', getTechnologiesByCategory); // Get technologies by category

module.exports = router;