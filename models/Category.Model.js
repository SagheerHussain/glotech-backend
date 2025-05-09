const mongoose = require("mongoose");

// Main schema for the category
const categorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description: {
      en: { type: String },
      ar: { type: String },
      fr: { type: String },
    },
    image: { type: String }, // URL of the image
    slug: { type: String, required: true }
  },
  { timestamps: true }
);

// Model for the category schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
