const Category = require("../models/Category.Model");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const newCategory = await Category.create({
      name: { en: name.en, ar: name.ar, fr: name.fr },
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

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: { en: name.en, ar: name.ar, fr: name.fr },
          slug,
        },
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
  updateCategory,
  deleteCategory,
};