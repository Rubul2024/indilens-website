require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const blogRoutes = require("./routes/blogRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const faqRoutes = require("./routes/faqRoutes");
const teamRoutes = require("./routes/teamRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://indilens-website.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// ROUTES
// ===============================

// Contact
app.use("/api/contact", contactRoutes);

// Admin
app.use("/api/admin", adminRoutes);

// Admin Dashboard
app.use("/api/admin/dashboard", dashboardRoutes);

// Newsletter
app.use("/api/newsletter", newsletterRoutes);

// Blog
app.use("/api/blog", blogRoutes);

// Portfolio
app.use("/api/portfolio", portfolioRoutes);

// Services
app.use("/api/services", serviceRoutes);

// FAQ
app.use("/api/faq", faqRoutes);

// Team
app.use("/api/team", teamRoutes);

// ===============================
// ROOT ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Indilens Backend API is running",
  });
});

// ===============================
// EXPORT APP FOR VERCEL
// ===============================

module.exports = app;