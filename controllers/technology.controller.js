const Technology = require("../models/Technology.Model");
const cloudinary = require("../cloudinary");

const createTechnology = async (req, res) => {
  try {
    const { category } = req.body;
    const titles = req.body.titles; // this can be string or array
    const titleArray = Array.isArray(titles) ? titles : [titles];
    const uploadedImages = await Promise.all(
      req.files.map(async (file, index) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "services",
        });
        return {
          url: result.secure_url,
          title: titleArray[index], // match file index with title index
        };
      })
    );

    const newTechnology = await Technology.create({
      images: uploadedImages,
      category,
    });
    return res.status(201).json({
      message: "Technology created successfully",
      data: newTechnology,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating technology", success: false });
  }
};

const getTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find().populate("category");
    return res.status(200).json({
      data: technologies,
      success: true,
      message: "Technologies retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching technologies", success: false });
  }
};

const getTechnologyById = async (req, res) => {
  try {
    const { id } = req.params;
    const technology = await Technology.findById({ _id: id }).populate(
      "category"
    );
    if (!technology) {
      return res
        .status(404)
        .json({ message: "Technology not found", success: false });
    }
    return res.status(200).json({
      data: technology,
      success: true,
      message: "Technology retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching technology", success: false });
  }
};

const getTechnologiesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const technologies = await Technology.find({ category }).populate(
      "category"
    );
    if (!technologies) {
      return res
        .status(200)
        .json({ message: "Technologies not found", success: false });
    }
    return res.status(200).json({
      data: technologies,
      success: true,
      message: "Technologies retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching technologies", success: false });
  }
};

const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    // Get titles & existingUrls safely
    let titles = req.body.titles;
    let existingUrls = req.body.existingUrls;

    const titleArray = Array.isArray(titles) ? titles : [titles];
    const urlArray = Array.isArray(existingUrls)
      ? existingUrls
      : [existingUrls];

    const finalImages = [];

    // Loop through all items
    for (let i = 0; i < titleArray.length; i++) {
      const file = req.files?.[i]; // multer keeps files in order

      if (file) {
        // ✅ New file uploaded → Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "services",
        });
        finalImages.push({
          url: result.secure_url,
          title: titleArray[i],
        });
      } else {
        // ✅ Keep existing image URL
        finalImages.push({
          url: urlArray[i],
          title: titleArray[i],
        });
      }
    }

    // ✅ Update MongoDB
    const technology = await Technology.findByIdAndUpdate(
      { _id: id },
      { images: finalImages, category },
      { new: true }
    );

    if (!technology) {
      return res
        .status(404)
        .json({ message: "Technology not found", success: false });
    }

    return res.status(200).json({
      data: technology,
      success: true,
      message: "Technology updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating technology",
      success: false,
    });
  }
};

const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTechnology = await Technology.findByIdAndDelete({ _id: id });
    if (!deletedTechnology) {
      return res
        .status(404)
        .json({ message: "Technology not found", success: false });
    }
    return res.status(200).json({
      data: deletedTechnology,
      success: true,
      message: "Technology deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting technology", success: false });
  }
};

module.exports = {
  createTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
  getTechnologiesByCategory,
};
