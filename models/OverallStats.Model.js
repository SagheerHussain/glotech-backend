const mongoose = require("mongoose");

const overallStatsSchema = new mongoose.Schema({
  stats: {
    en: {
      projectsDelivered: { type: Number, required: true },
      clients: { type: Number, required: true },
      yearsActive: { type: Number, required: true },
      awards: { type: Number, required: true },
    },
    ar: {
      projectsDelivered: { type: Number, required: true },
      clients: { type: Number, required: true },
      yearsActive: { type: Number, required: true },
      awards: { type: Number, required: true },
    },
    fr: {
      projectsDelivered: { type: Number, required: true },
      clients: { type: Number, required: true },
      yearsActive: { type: Number, required: true },
      awards: { type: Number, required: true },
    },
  },
});

module.exports = mongoose.model("OverallStats", overallStatsSchema);
