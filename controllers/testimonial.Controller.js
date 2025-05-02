const Testimonial = require("../models/Testimonial.Model");
const cloudinary = require("../cloudinary");

// Create Testimonial - Adds a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, rating, review } = req.body;

    if (!name || !rating || !req.file || !review) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const imgPath = await cloudinary.uploader.upload(req.file.path);

    const newTestimonial = await Testimonial.create({
      name: {
        en: name.en,
        ar: name.ar,
        fr: name.fr,
      },
      rating,
      image: imgPath.secure_url,
      review: {
        en: review.en,
        ar: review.ar,
        fr: review.fr,
      },
    });

    return res.status(201).json({
      message: "Testimonial created successfully",
      newTestimonial,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating testimonial", success: false });
  }
};

// Get all Testimonials - Retrieves all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    if (testimonials.length === 0) {
      return res
        .status(404)
        .json({ message: "No testimonials found", success: false });
    }
    return res.json({
      data: testimonials,
      success: true,
      message: "Testimonials Retrieved Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching testimonials", success: false });
  }
};

// Get a single Testimonial - Retrieves a specific testimonial by ID
const getTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res
        .status(404)
        .json({ message: "Testimonial not found", success: false });
    }

    return res.json({
      data: testimonial,
      success: true,
      message: "Testimonial Retrieved Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching testimonial", success: false });
  }
};

// Update Testimonial - Updates a specific testimonial by ID
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, review } = req.body;

    let imgPath = "";
    if (req.file) {
      imgPath = await cloudinary.uploader.upload(req.file.path);
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        $set: {
          name: {
            en: name.en,
            ar: name.ar,
            fr: name.fr,
          },
          rating,
          image: imgPath ? imgPath.secure_url : updatedTestimonial.image,
          review: {
            en: review.en,
            ar: review.ar,
            fr: review.fr,
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedTestimonial) {
      return res
        .status(404)
        .json({ message: "Testimonial not found", success: false });
    }

    return res.json({
      message: "Testimonial updated successfully",
      success: true,
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating testimonial", success: false });
  }
};

// Delete Testimonial - Deletes a specific testimonial by ID
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete({ _id: id });

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found", success: false });
    }

    return res.json({ message: "Testimonial deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting testimonial", success: false });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
