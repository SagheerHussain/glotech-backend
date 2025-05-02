const Color = require("../models/Color.Model"); // Import the Color model

// Create Color - Adds a new color setting
const createColor = async (req, res) => {
  try {
    const { primary, secondary } = req.body;

    if (!primary || !secondary) {
      return res.status(400).json({
        message: "Primary and secondary colors are required",
        success: false,
      });
    }

    // Create a new Color document
    const newColor = await Color.create({
      primary,
      secondary,
    });

    return res.status(201).json({
      message: "Color settings created successfully",
      data: newColor,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating color settings", success: false });
  }
};

// Get All Colors
const getColors = async (req, res) => {
  try {
    const colors = await Color.find();
    if (!colors || colors.length === 0) {
      return res
        .status(404)
        .json({ message: "No color settings found", success: false });
    }
    return res.json({
      data: colors,
      success: true,
      message: "Colors fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching color settings", success: false });
  }
};

// Get Color by ID
const getColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findById({ _id: id });

    if (!color) {
      return res
        .status(404)
        .json({ message: "Color settings not found", success: false });
    }

    return res.json({
      data: color,
      success: true,
      message: "Color settings fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching color settings", success: false });
  }
};

// Update Color by ID
const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { primary, secondary } = req.body;

    if (!primary || !secondary) {
      return res.status(400).json({
        message: "Primary and secondary colors are required",
        success: false,
      });
    }

    const updatedColor = await Color.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          primary,
          secondary,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedColor) {
      return res
        .status(404)
        .json({ message: "Color settings not found", success: false });
    }

    return res.json({
      message: "Color settings updated successfully",
      updatedColor,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating color settings", success: false });
  }
};

// Delete Color by ID
const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedColor = await Color.findByIdAndDelete({ _id: id });

    if (!deletedColor) {
      return res.status(404).json({ message: "Color settings not found", success: false });
    }

    return res.json({ message: "Color settings deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting color settings", success: false });
  }
};

module.exports = {
  createColor,
  getColors,
  getColor,
  updateColor,
  deleteColor,
};
