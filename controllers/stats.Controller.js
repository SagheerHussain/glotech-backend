const ServiceStats = require("../models/Stats.Model"); // Import the ServiceStats model

// Create Service Stats
const createServiceStats = async (req, res) => {
  try {
    const { service_id, stats } = req.body;

    if (!service_id || !stats) {
      return res
        .status(400)
        .json({ message: "Service ID and stats are required", success: false });
    }

    // Create a new ServiceStats document
    const newStats = await ServiceStats.create({
      service_id,
      stats: {
        en: stats.en,
        ar: stats.ar,
        fr: stats.fr,
      },
    });

    return res
      .status(201)
      .json({
        message: "Service stats created successfully",
        newStats,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating service stats", success: false });
  }
};

// Get all Service Stats
const getServiceStats = async (req, res) => {
  try {
    const stats = await ServiceStats.find();
    if (!stats.length) {
      return res
        .status(404)
        .json({ message: "No service stats found", success: false });
    }
    return res.json({ data: stats, success: true, message: "Stats retrieved successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching service stats", success: false });
  }
};

// Get Service Stats by ID
const getServiceStatsById = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await ServiceStats.findById({ _id: id });

    if (!stats) {
      return res.status(404).json({ message: "Service stats not found", success: false });
    }

    return res.json({ data: stats, success: true, message: "Stats retrieved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching service stats", success: false });
  }
};

// Update Service Stats
const updateServiceStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { stats } = req.body;

    if (!stats) {
      return res.status(400).json({ message: "Stats are required", success: false });
    }

    const updatedStats = await ServiceStats.findByIdAndUpdate(
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

    if (!updatedStats) {
      return res.status(404).json({ message: "Service stats not found", success: false });
    }

    return res.json({
      message: "Service stats updated successfully",
      data: updatedStats,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating service stats", success: false });
  }
};

// Delete Service Stats
const deleteServiceStats = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStats = await ServiceStats.findByIdAndDelete({ _id: id });

    if (!deletedStats) {
      return res.status(404).json({ message: "Service stats not found", success: false });
    }

    return res.json({ message: "Service stats deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting service stats", success: false });
  }
};

module.exports = {
  createServiceStats,
  getServiceStats,
  getServiceStatsById,
  updateServiceStats,
  deleteServiceStats,
};
