const Team = require("../models/Team.Model"); // Import the Team model
const cloudinary = require("../cloudinary");

// Create Team - Adds a new team member
const createTeam = async (req, res) => {
  try {
    const { name, designation } = req.body;

    if (!name || !designation || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const imgPath = await cloudinary.uploader.upload(req.file.path);

    // Create a new Team document
    const newTeam = await Team.create({
      name: {
        en: name.en,
        ar: name.ar,
        fr: name.fr,
      },
      designation: {
        en: designation.en,
        ar: designation.ar,
        fr: designation.fr,
      },
      image: imgPath.secure_url,
    });

    return res.status(201).json({
      message: "Team member created successfully",
      data: newTeam,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating team member", success: false });
  }
};

// Get All Team Members
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    if (!teamMembers || teamMembers.length === 0) {
      return res
        .status(404)
        .json({ message: "No team members found", success: false });
    }
    return res.json({
      data: teamMembers,
      success: true,
      message: "Teams retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching team members", success: false });
  }
};

// Get Team Member by ID
const getTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findById({ _id: id });

    if (!teamMember) {
      return res
        .status(404)
        .json({ message: "Team member not found", success: false });
    }

    return res.json({
      data: teamMember,
      success: true,
      message: "Team member retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching team member", success: false });
  }
};

// Update Team Member by ID
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation } = req.body;

    let imgPath = "";
    if (req.file) {
      imgPath = await cloudinary.uploader.upload(req.file.path);
    }
 

    const updatedTeamMember = await Team.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: {
            en: name.en,
            ar: name.ar,
            fr: name.fr,
          },
          designation: {
            en: designation.en,
            ar: designation.ar,
            fr: designation.fr,
          },
          image: imgPath ? imgPath.secure_url : updatedTeamMember.image,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedTeamMember) {
      return res
        .status(404)
        .json({ message: "Team member not found", success: false });
    }

    return res.json({
      message: "Team member updated successfully",
      updatedTeamMember,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating team member", success: false });
  }
};

// Delete Team Member by ID
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeamMember = await Team.findByIdAndDelete({ _id: id });

    if (!deletedTeamMember) {
      return res.status(404).json({ message: "Team member not found", success: false });
    }

    return res.json({ message: "Team member deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting team member", success: false });
  }
};

module.exports = {
  createTeam,
  getTeamMembers,
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
