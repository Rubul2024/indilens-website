const express = require("express");

const {
  getDashboardOverview,
} = require("../controllers/dashboardController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// ADMIN DASHBOARD OVERVIEW
// ==========================================
// GET /api/admin/dashboard
// Protected Admin Route
// ==========================================

router.get("/", protect, getDashboardOverview);

module.exports = router;