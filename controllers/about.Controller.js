const About = require("../models/About.Model");

// Create About - Adds a new about section
const createAbout = async (req, res) => {
  try {
    const { mission, vision, target } = req.body;

    // Ensure all three languages are provided
    if (!mission || !vision || !target) {
      return res.status(400).json({
        message: "All fields are required for mission, vision, and target.",
        success: false,
      });
    }

    // Create new About document
    const newAbout = await About.create({
      mission: {
        en: mission.en,
        ar: mission.ar,
        fr: mission.fr,
      },
      vision: {
        en: vision.en,
        ar: vision.ar,
        fr: vision.fr,
      },
      target: {
        en: target.en,
        ar: target.ar,
        fr: target.fr,
      },
    });

    return res.status(201).json({
      data: newAbout,
      success: true,
      message: "About section created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating about data", success: false });
  }
};

// Read About - Get about section data
const getAboutLists = async (req, res) => {
  try {
    const aboutData = await About.find();
    if (!aboutData) {
      return res
        .status(404)
        .json({ message: "About section not found", success: false });
    }
    return res.json({ data: aboutData, success: true, message: "About Retrieved" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching about data", success: false });
  }
};

// Read About - Get about section data
const getAbout = async (req, res) => {
  try {
    const aboutData = await About.findById({ _id: req.params.id });
    if (!aboutData) {
      return res
        .status(404)
        .json({ message: "About section not found", success: false });
    }
    return res.json({ data: aboutData, success: true, message: "About Retrieved" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching about data", success: false });
  }
};

// Update About - Updates the mission, vision, or target
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { mission, vision, target } = req.body;

    // Ensure that at least one of the fields (mission, vision, target) is provided
    if (!mission && !vision && !target) {
      return res
        .status(400)
        .json({
          message: "At least one field (mission, vision, target) is required",
        });
    }

    // Prepare the update object for mission, vision, and target
    let updateData = {};

    if (mission) {
      if (mission.en) updateData["mission.en"] = mission.en; // Update only English text of mission
      // Preserve existing Arabic and French if not updated
      if (mission.ar) updateData["mission.ar"] = mission.ar;
      if (mission.fr) updateData["mission.fr"] = mission.fr;
    }

    if (vision) {
      if (vision.en) updateData["vision.en"] = vision.en; // Update only English text of vision
      // Preserve existing Arabic and French if not updated
      if (vision.ar) updateData["vision.ar"] = vision.ar;
      if (vision.fr) updateData["vision.fr"] = vision.fr;
    }

    if (target) {
      if (target.en) updateData["target.en"] = target.en; // Update only English text of target
      // Preserve existing Arabic and French if not updated
      if (target.ar) updateData["target.ar"] = target.ar;
      if (target.fr) updateData["target.fr"] = target.fr;
    }

    // Perform the update operation using findOneAndUpdate
    const updatedAbout = await About.findOneAndUpdate(
      { _id: id }, // Empty object means update the first matching document
      { $set: updateData },
      { new: true } // Return the updated document
    );

    if (!updatedAbout) {
      return res.status(404).json({ message: "About data not found" });
    }

    return res.json({
      message: "About data updated successfully",
      success: true,
      updatedAbout,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating About data" });
  }
};

// Delete About - Deletes the about section
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAbout = await About.findOneAndDelete({ _id: id });

    if (!deletedAbout) {
      return res.status(404).json({ message: "About section not found" });
    }

    return res.json({ message: "About section deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting about data" });
  }
};

module.exports = {
  createAbout,
  getAbout,
  getAboutLists,
  updateAbout,
  deleteAbout,
};
