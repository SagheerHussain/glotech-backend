const mongoose = require("mongoose");

const serviceStatsSchema = new mongoose.Schema({
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
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

const ServiceStats = mongoose.model("ServiceStats", serviceStatsSchema);
module.exports = ServiceStats;
