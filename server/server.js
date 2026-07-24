require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// ===============================
// IMPORT ROUTES
// ===============================

const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const blogRoutes = require("./routes/blogRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const faqRoutes = require("./routes/faqRoutes");
const teamRoutes = require("./routes/teamRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// ===============================
// CREATE EXPRESS APP
// ===============================

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ===============================
// DATABASE CONNECTION
// ===============================

connectDB();

// ===============================
// API ROUTES
// ===============================

// CONTACT
app.use("/api/contact", contactRoutes);

// ADMIN
app.use("/api/admin", adminRoutes);

// DASHBOARD
app.use("/api/admin/dashboard", dashboardRoutes);

// NEWSLETTER
app.use("/api/newsletter", newsletterRoutes);

// BLOG
app.use("/api/blog", blogRoutes);

// PORTFOLIO
app.use("/api/portfolio", portfolioRoutes);

// SERVICES
app.use("/api/services", serviceRoutes);

// FAQ
app.use("/api/faq", faqRoutes);

// TEAM
app.use("/api/team", teamRoutes);

// ===============================
// ROOT ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Indilens Backend API is running",
  });
});

// ===============================
// LOCAL DEVELOPMENT
// ===============================

// Vercel does not use app.listen()
// Vercel imports the Express app directly.

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Indilens Backend Server is running on port ${PORT}`
    );
  });
}

// ===============================
// EXPORT APP FOR VERCEL
// ===============================

module.exports = app;