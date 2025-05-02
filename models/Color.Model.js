const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  primary: { type: String, required: true },
  secondary: { type: String, required: true }
});

module.exports = mongoose.model("Color", colorSchema);
