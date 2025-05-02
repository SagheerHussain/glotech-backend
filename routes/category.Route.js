const express = require("express");

const router = express.Router();

// Import the controller functions
const { createCategory, getCategoriesLists, getCategory, updateCategory, deleteCategory } = require("../controllers/category.Controller");

// Routes for the Category CRUD operations
router.post("/", createCategory);
router.get("/", getCategoriesLists);
router.get("/get/:id", getCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
