const express = require("express");

// ==================================================
// IMPORT DASHBOARD CONTROLLER
// ==================================================

const { getDashboardOverview } = require("../controllers/dashboardController");

// ==================================================
// IMPORT ADMIN AUTH MIDDLEWARE
// ==================================================

const { protect } = require("../middleware/authMiddleware");

// ==================================================
// CREATE ROUTER
// ==================================================

const router = express.Router();

// ==================================================
// ADMIN DASHBOARD OVERVIEW
//
// GET /api/admin/dashboard
//
// ADMIN ONLY
// ==================================================

router.get(
  "/dashboard",

  protect,

  getDashboardOverview,
);

// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;
