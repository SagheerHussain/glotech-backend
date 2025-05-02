const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect(
        `${process.env.MONGO_URL}`
      )
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
