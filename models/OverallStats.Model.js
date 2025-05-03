const mongoose = require("mongoose");

const overallStatsSchema = new mongoose.Schema({
  projectsDelivered: {
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    count: { type: String, required: true },
  },
  clients: {
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    count: { type: String, required: true },
  },
  divisions: {
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    count: { type: String, required: true },
  },
  awards: {
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
    count: { type: String, required: true },
  },
});

module.exports = mongoose.model("OverallStats", overallStatsSchema);
