const mongoose = require("mongoose");

const Testimonial = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    review: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Testimonial", Testimonial);
