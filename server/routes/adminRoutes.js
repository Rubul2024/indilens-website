const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} = require("../controllers/adminController");

const protectAdmin = require("../middleware/adminAuthMiddleware");

const router = express.Router();

// ========================================
// ADMIN REGISTRATION
// POST /api/admin/register
// ========================================

router.post("/register", registerAdmin);

// ========================================
// ADMIN LOGIN
// POST /api/admin/login
// ========================================

router.post("/login", loginAdmin);

// ========================================
// PROTECTED ADMIN PROFILE
// GET /api/admin/profile
// ========================================

router.get("/profile", protectAdmin, getAdminProfile);

module.exports = router;
