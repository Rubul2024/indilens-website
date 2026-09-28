const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  updatePassword,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// LOGIN RATE LIMIT
// 10 failed attempts per IP every 15 minutes
// ========================================

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

// ========================================
// ROUTES
// ========================================

router.post("/login", loginLimiter, loginAdmin);

router.get("/profile", protect, getAdminProfile);
router.put("/profile", protect, updateAdminProfile);

router.put("/password", protect, updatePassword);

module.exports = router;
