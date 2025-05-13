const mongoose = require("mongoose");

const TechnologySchema = new mongoose.Schema({
  images: [
    {
      url: { type: String },
      title: { type: String }
    },
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Technology", TechnologySchema);
