const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    service_points: [
      {
        title: {
          en: { type: String, required: true },
          ar: { type: String, required: true },
          fr: { type: String, required: true },
        },
        content: {
          en: { type: String, required: true },
          ar: { type: String, required: true },
          fr: { type: String, required: true },
        },
        images: [
          {
            url: { type: String }, // URL of the image
          },
        ],
      },
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

// Model for the service schema
module.exports = mongoose.model("Service", serviceSchema);
