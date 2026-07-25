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

app.options("*", cors());

app.use(express.json());

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// ROUTES
// ===============================

app.use("/api/contact", contactRoutes);

// ===============================
// ADMIN ROUTES
// ===============================

app.use("/api/admin", adminRoutes);


// ===============================
// DASHBOARD ROUTES
// ===============================

app.use("/api/admin/dashboard", dashboardRoutes);

// ===============================
// NEWSLETTER ROUTES
// ===============================

app.use("/api/newsletter", newsletterRoutes);

// ===============================
// BLOG ROUTES
// ===============================

app.use("/api/blog", blogRoutes);

// ===============================
// PORTFOLIO ROUTES
// ===============================

app.use("/api/portfolio", portfolioRoutes);

// ===============================
// FAQ ROUTES
// ===============================

app.use("/api/faq", faqRoutes);

// ===============================
// PORTFOLIO ROUTES
// ===============================

app.use("/api/services", serviceRoutes);

// ===============================
// PORTFOLIO ROUTES
// ===============================

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
  console.log(`Indilens Backend Server is running on port ${PORT}`);
});
