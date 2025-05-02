const mongoose = require("mongoose");

const About = new mongoose.Schema({
  mission: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
  vision: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
  target: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
});

module.exports = new mongoose.model("About", About);
