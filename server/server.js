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
// CORS
// ===============================

const allowedOrigins = [
  "http://localhost:5173",
  "https://indilens-website.vercel.app",
  "https://indilens-website-ia62.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      // Example: Postman, mobile apps, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ========================================
// BODY PARSER
// ========================================

app.use(express.json());

// ========================================
// DATABASE
// ========================================

connectDB();

// ========================================
// API ROUTES
// ========================================

app.use("/api/contact", contactRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin/dashboard", dashboardRoutes);

app.use("/api/newsletter", newsletterRoutes);

app.use("/api/blog", blogRoutes);

app.use("/api/portfolio", portfolioRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/faq", faqRoutes);

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
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ===============================
// EXPORT APP
// ===============================

module.exports = app;