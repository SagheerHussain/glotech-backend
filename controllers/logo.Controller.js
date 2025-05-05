const Logo = require("../models/Logo.Model"); // Import the Logo model
const cloudinary = require("../cloudinary");

// Create Logo - Adds a new logo
const createLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Image is required", success: false });
    }

    const imgPath = await cloudinary.uploader.upload(req.file.path);

    // Create a new Logo document
    const newLogo = await Logo.create({
      image: imgPath.secure_url,
    });

    return res
      .status(201)
      .json({ message: "Logo created successfully", newLogo, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating logo", success: false });
  }
};

// Get all Logos
const getLogo = async (req, res) => {
  try {
    const logos = await Logo.find();
    if (logos.length === 0) {
      return res
        .status(404)
        .json({ message: "No logos found", success: false });
    }
    return res.json({ data: logos, success: true, message: "Logo Retrieved" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching logos", success: false });
  }
};

// Get a specific logo by ID
const getLogoById = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await Logo.findById({ _id: id });
    if (!logo) {
      return res
        .status(404)
        .json({ message: "Logo not found", success: false });
    }
    return res.json({ data: logo, success: true, message: "Logo Retrieved" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching logo", success: false });
  }
};

// Update Logo by ID
const updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    let imgPath = "";
    if (req.file) {
      imgPath = await cloudinary.uploader.upload(req.file.path);
    }

    const logo = await Logo.findById({ _id: id });

    const updatedLogo = await Logo.findByIdAndUpdate(
      { _id: id },
      {
        image: imgPath ? imgPath.secure_url : logo.image,
      },
      { new: true } // Return the updated document
    );

    if (!updatedLogo) {
      return res
        .status(404)
        .json({ message: "Logo not found", success: false });
    }

    return res.json({
      message: "Logo updated successfully",
      data: updatedLogo,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating logo", success: false });
  }
};

// Delete Logo by ID
const deleteLogo = async (req, res) => {
  try {
    const { id } = useParams;
    const deletedLogo = await Logo.findByIdAndDelete({ _id: id });

    if (!deletedLogo) {
      return res
        .status(404)
        .json({ message: "Logo not found", success: false });
    }

    return res.json({ message: "Logo deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting logo", success: false });
  }
};

module.exports = {
  createLogo,
  getLogo,
  getLogoById,
  updateLogo,
  deleteLogo,
};
