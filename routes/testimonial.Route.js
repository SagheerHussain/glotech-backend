const express = require("express");
const router = express.Router();
const upload = require("../upload");

// Import Controller
const { createTestimonial, getTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } = require("../controllers/testimonial.Controller");

// Routes
router.post("/", upload.single("image"), createTestimonial);
router.get("/", getTestimonials);
router.get("/get/:id", getTestimonialById);
router.put("/update/:id", upload.single("image"), updateTestimonial);
router.delete("/delete/:id", deleteTestimonial);

module.exports = router;
