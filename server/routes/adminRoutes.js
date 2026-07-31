const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updatePassword,
} = require("../controllers/adminController");

const protectAdmin = require("../middleware/adminAuthMiddleware");

const router = express.Router();

// ========================================
// ADMIN REGISTER
// ========================================

router.post("/register", registerAdmin);

// ========================================
// ADMIN LOGIN
// ========================================

router.post("/login", loginAdmin);

// ========================================
// ADMIN PROFILE
// ========================================

router.get(
  "/profile",
  protectAdmin,
  getAdminProfile
);

// ========================================
// CHANGE PASSWORD
// ========================================

router.put(
  "/password",
  protectAdmin,
  updatePassword
);

module.exports = router;