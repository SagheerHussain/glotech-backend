const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
  designation: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Team", teamSchema);
