const Category = require("../models/Category.Model");
const cloudinary = require("../cloudinary");

// Create Category
const createCategory = async (req, res) => {
  try {
    const {
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      slug,
    } = req.body;

    if (
      !name_en ||
      !name_ar ||
      !name_fr ||
      !description_en ||
      !description_ar ||
      !description_fr ||
      !slug ||
      !req.file
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const imgPath = await cloudinary.uploader.upload(req.file.path);

    const newCategory = await Category.create({
      name: { en: name_en, ar: name_ar, fr: name_fr },
      description: {
        en: description_en,
        ar: description_ar,
        fr: description_fr,
      },
      image: imgPath.secure_url,
      slug,
    });

    return res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating category", success: false });
  }
};

// Get Category Lists
const getCategoriesLists = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res
        .status(200)
        .json({ message: "No categories found", success: true });
    }
    return res.json({
      data: categories,
      success: true,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", success: false });
  }
};

// Get Category by ID
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id });

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    return res.json({
      data: category,
      success: true,
      message: "Category retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching category", success: false });
  }
};

// Get Category by Slug
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    return res.json({
      data: category,
      success: true,
      message: "Category retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching category", success: false });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      slug,
    } = req.body;

    let imgPath = "";
    if (req.file) {
      imgPath = await cloudinary.uploader.upload(req.file.path);
    }

    const category = await Category.findById({ _id: id });

    const updateCategory = await Category.findByIdAndUpdate(
      { _id: id },
      {
        name: { en: name_en, ar: name_ar, fr: name_fr },
        description: {
          en: description_en,
          ar: description_ar,
          fr: description_fr,
        },
        image: imgPath ? imgPath.secure_url : category.image,
        slug,
      },
      { new: true }
    );

    if (!updateCategory) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    return res.json({
      data: updateCategory,
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating category", success: false });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndDelete({ _id: id });

    if (!deleteCategory) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    return res.json({
      data: deleteCategory,
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting category", success: false });
  }
};

module.exports = {
  createCategory,
  getCategoriesLists,
  getCategory,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
