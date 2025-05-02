const mongoose = require("mongoose");

const Contact = new mongoose.Schema(
  {
    location: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Contact", Contact);
