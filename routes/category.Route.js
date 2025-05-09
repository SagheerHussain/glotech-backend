const express = require("express");
const upload = require("../upload");

const router = express.Router();

// Import the controller functions
const { createCategory, getCategoriesLists, getCategory, getCategoryBySlug, updateCategory, deleteCategory } = require("../controllers/category.Controller");

// Routes for the Category CRUD operations
router.post("/", upload.single("image"), createCategory);
router.get("/", getCategoriesLists);
router.get("/get/:id", getCategory);
router.get("/slug/:slug", getCategoryBySlug);
router.put("/update/:id", upload.single("image"), updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
