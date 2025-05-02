const OverallStats = require("../models/OverallStats.Model");

// Create Overall Stats
const createOverallStats = async (req, res) => {
  try {
    const { stats } = req.body;

    if (!stats) {
      return res
        .status(400)
        .json({ message: "Stats are required", success: false });
    }

    // Create a new OverallStats document
    const newOverallStats = await OverallStats.create({
      stats: {
        en: stats.en,
        ar: stats.ar,
        fr: stats.fr,
      },
    });

    return res.status(201).json({
      message: "Overall stats created successfully",
      data: newOverallStats,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating overall stats", success: false });
  }
};

// Get Overall Stats
const getOverallStats = async (req, res) => {
  try {
    const overallStats = await OverallStats.find();
    if (!overallStats || overallStats.length === 0) {
      return res
        .status(404)
        .json({ message: "No overall stats found", success: false });
    }
    return res.json({
      data: overallStats,
      success: true,
      message: "Overall stats retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching overall stats", success: false });
  }
};

// Update Overall Stats
const updateOverallStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { stats } = req.body;

    if (!stats) {
      return res.status(400).json({ message: "Stats are required" });
    }

    const updatedOverallStats = await OverallStats.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          stats: {
            en: stats.en,
            ar: stats.ar,
            fr: stats.fr,
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedOverallStats) {
      return res
        .status(404)
        .json({ message: "Overall stats not found", success: false });
    }

    return res.json({
      message: "Overall stats updated successfully",
      updatedOverallStats,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating overall stats", success: false });
  }
};

// Delete Overall Stats
const deleteOverallStats = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOverallStats = await OverallStats.findByIdAndDelete({
      _id: id,
    });

    if (!deletedOverallStats) {
      return res
        .status(404)
        .json({ message: "Overall stats not found", success: false });
    }

    return res.json({
      message: "Overall stats deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting overall stats", success: false });
  }
};

module.exports = {
  createOverallStats,
  getOverallStats,
  updateOverallStats,
  deleteOverallStats,
};
