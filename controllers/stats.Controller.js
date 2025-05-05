const Stats = require("../models/Stats.Model"); // Import the ServiceStats model
const Category = require("../models/Category.Model");

// Create Service Stats
const createStats = async (req, res) => {
  try {
    const { category, statOne, statTwo, statThree, statFour, symbol } = req.body;

    if (!category || !statOne || !statTwo || !statThree || !statFour || !symbol) {
      return res
        .status(400)
        .json({ message: "Category and stats are required", success: false });
    }

    const isExist = await Category.findById({ _id: category });

    if (!isExist) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    // Create a new ServiceStats document
    const newStats = await Stats.create({
      category,
      statOne,
      statTwo,
      statThree,
      statFour,
      symbol,
    });

    return res.status(201).json({
      message: "Stats created successfully",
      data: newStats,
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
const getStats = async (req, res) => {
  try {
    const stats = await Stats.find().populate("category");
    if (!stats.length) {
      return res
        .status(404)
        .json({ message: "No stats found", success: false });
    }
    return res.json({
      data: stats,
      success: true,
      message: "Stats retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching service stats", success: false });
  }
};

// Get Service Stats by ID
const getStatsById = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await Stats.findById({ _id: id }).populate("category");

    if (!stats) {
      return res
        .status(404)
        .json({ message: "Service stats not found", success: false });
    }

    return res.status(200).json({
      data: stats,
      success: true,
      message: "Stats retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching service stats", success: false });
  }
};

// Update Service Stats
const updateStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, statOne, statTwo, statThree, statFour, symbol } = req.body;

    const isExist = await Category.findById({ _id: category });

    if (!isExist) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    if (!category || !statOne || !statTwo || !statThree || !statFour) {
      return res
        .status(400)
        .json({ message: "Stats are required", success: false });
    }

    const updatedStats = await Stats.findByIdAndUpdate(
      { _id: id },
      {
        category,
        statOne,
        statTwo,
        statThree,
        statFour,
        symbol,
      },
      { new: true } // Return the updated document
    );

    if (!updatedStats) {
      return res
        .status(404)
        .json({ message: "Service stats not found", success: false });
    }

    return res.json({
      message: "Service stats updated successfully",
      data: updatedStats,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating service stats", success: false });
  }
};

// Delete Service Stats
const deleteStats = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStats = await Stats.findByIdAndDelete({ _id: id });

    if (!deletedStats) {
      return res
        .status(404)
        .json({ message: "Stats not found", success: false });
    }

    return res.json({
      message: "Stats deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting service stats", success: false });
  }
};

module.exports = {
  createStats,
  getStats,
  getStatsById,
  updateStats,
  deleteStats,
};
