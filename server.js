const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");

dotenv.config();

const app = express();

// MongoDB Connection
connectDB();

const allowedOrigins = [
  "http://localhost:5173", // Localhost (development)
];

// PORT
const PORT = process.env.PORT || 5000;

// Built In Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman) or if origin is in allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (
    req.headers["content-type"] &&
    req.headers["content-type"].includes("multipart/form-data")
  ) {
    return next(); // Skip body parsing for file upload routes
  }
  express.json()(req, res, () => {
    express.urlencoded({ extended: true })(req, res, next);
  });
});

// Import Routes
const aboutRoute = require("./routes/about.Route");
const logoRoute = require("./routes/logo.Route");
const serviceRoute = require("./routes/service.Route");
const contactRoute = require("./routes/contact.Route");
const statsRoute = require("./routes/stats.Route");
const overallStatsRoute = require("./routes/overallStats.Route");
const teamsRoute = require("./routes/team.Route");
const testimonialsRoute = require("./routes/testimonial.Route");
const colorsRoute = require("./routes/color.Route");
const categoryRoute = require("./routes/category.Route");

// Welcome Message
app.get("/", (req, res) => {
  return res.send("Hello Glotech KSA!");
});

// Routes
app.use("/api/about", aboutRoute);
app.use("/api/logo", logoRoute);
app.use("/api/service", serviceRoute);
app.use("/api/contact", contactRoute);
app.use("/api/stats", statsRoute);
app.use("/api/overallStats", overallStatsRoute);
app.use("/api/teams", teamsRoute);
app.use("/api/testimonials", testimonialsRoute);
app.use("/api/colors", colorsRoute);
app.use("/api/category", categoryRoute);

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
