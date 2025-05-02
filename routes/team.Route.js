const express = require('express');
const router = express.Router();

// Import the controller functions
const { createTeam, getTeamMembers, getTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/team.Controller');

// Routes for the Team CRUD operations
router.post('/', createTeam); // Create a new team member
router.get('/', getTeamMembers); // Get all team members
router.get('/:id', getTeamMember); // Get a specific team member by ID
router.put('/:id', updateTeamMember); // Update a team member by ID
router.delete('/:id', deleteTeamMember); // Delete a team member by ID

module.exports = router;
