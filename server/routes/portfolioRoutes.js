const express = require("express");

// ==================================================
// IMPORT PORTFOLIO CONTROLLER
// ==================================================

const {
  getPublishedPortfolios,

  getPortfolioBySlug,

  createPortfolio,

  updatePortfolio,

  deletePortfolio,
} = require("../controllers/portfolioController");

// ==================================================
// IMPORT ADMIN AUTH MIDDLEWARE
// ==================================================

const { protect } = require("../middleware/authMiddleware");

// ==================================================
// CREATE ROUTER
// ==================================================

const router = express.Router();

// ==================================================
// PUBLIC
// GET ALL PUBLISHED PORTFOLIOS
// GET /api/portfolio
// ==================================================

router.get(
  "/",

  getPublishedPortfolios,
);

// ==================================================
// PUBLIC
// GET SINGLE PORTFOLIO BY SLUG
// GET /api/portfolio/:slug
// ==================================================

router.get(
  "/:slug",

  getPortfolioBySlug,
);

// ==================================================
// ADMIN
// CREATE PORTFOLIO
// POST /api/portfolio
// ==================================================

router.post("/create", protect, createPortfolio);

// ==================================================
// ADMIN
// UPDATE PORTFOLIO
// PUT /api/portfolio/:id
// ==================================================

router.put(
  "/:id",

  protect,

  updatePortfolio,
);

// ==================================================
// ADMIN
// DELETE PORTFOLIO
// DELETE /api/portfolio/:id
// ==================================================

router.delete(
  "/:id",

  protect,

  deletePortfolio,
);

// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;
