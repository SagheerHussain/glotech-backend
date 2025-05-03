const mongoose = require("mongoose");

const serviceStatsSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  statOne: {
    count: { type: String, required: true },
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
  },
  statTwo: {
    count: { type: String, required: true },
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
  },
  statThree: {
    count: { type: String, required: true },
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
  },
  statFour: {
    count: { type: String, required: true },
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      fr: { type: String, required: true },
    },
  },
});

const ServiceStats = mongoose.model("ServiceStats", serviceStatsSchema);
module.exports = ServiceStats;
