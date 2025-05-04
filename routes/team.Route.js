const express = require("express");
const router = express.Router();
const upload = require("../upload");

// Import the controller functions
const {
  createTeam,
  getTeamMembers,
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/team.Controller");

// Routes for the Team CRUD operations
router.post(
  "/",
  (req, res, next) => {
    console.log("🔥 Incoming form request");
    next();
  },
  upload.single("image"),
  createTeam
); // Create a new team member
router.get("/", getTeamMembers); // Get all team members
router.get("/get/:id", getTeamMember); // Get a specific team member by ID
router.put("/update/:id", upload.single("image"), updateTeamMember); // Update a team member by ID
router.delete("/delete/:id", deleteTeamMember); // Delete a team member by ID

module.exports = router;
