require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const ensureAdmin = require("./config/ensureAdmin");
const sanitizeInput = require("./middleware/sanitizeInput");

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

// Vercel sits behind a proxy; needed for correct client IPs in rate limiting
app.set("trust proxy", 1);
app.disable("x-powered-by");

// ========================================
// SECURITY HEADERS
// ========================================

app.use(helmet());

// ========================================
// CORS
// ========================================

const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "https://indilens-website-jyij.vercel.app",
  "https://indilens.com",
  "https://www.indilens.com",
];

const allowedOrigins = new Set([
  ...DEFAULT_ORIGINS,
  ...(process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests and tools with no Origin header
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

// ========================================
// BODY PARSER
// ========================================

app.use(express.json({ limit: "1mb" }));
app.use(sanitizeInput);

// ========================================
// DATABASE
// ========================================

app.use(async (req, res, next) => {
  try {
    await connectDB();
    await ensureAdmin();
    next();
  } catch (error) {
    console.error("Database Error:", error.message);
    res.status(503).json({
      success: false,
      message: "Database unavailable. Please try again later.",
    });
  }
});

// ========================================
// API ROUTES
// ========================================

app.use("/api/contact", contactRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
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
// 404 + ERROR HANDLERS
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body." });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Request body is too large." });
  }

  console.error("Unhandled Error:", error);

  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
