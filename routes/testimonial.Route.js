const express = require("express");
const router = express.Router();

// Import Controller
const { createTestimonial, getTestimonials, getTestimonial, updateTestimonial, deleteTestimonial } = require("../controllers/testimonial.Controller");

// Routes
router.post("/", createTestimonial);
router.get("/", getTestimonials);
router.get("/get", getTestimonial);
router.put("/update", updateTestimonial);
router.delete("/delete", deleteTestimonial);

module.exports = router;
