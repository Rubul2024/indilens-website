const express = require("express");

const Portfolio = require("../models/Portfolio");

const {
  getPublishedPortfolios,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const {
  validateObjectId,
  listAll,
  getById,
} = require("../controllers/adminResourceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ==================================================
// ADMIN - ALL RECORDS (drafts included) + BY ID
// Must be registered before the public "/:slug" route
// ==================================================

router.get("/admin/all", protect, listAll(Portfolio, { createdAt: -1 }));
router.get("/admin/:id", protect, validateObjectId, getById(Portfolio));

// ==================================================
// PUBLIC
// ==================================================

router.get("/", getPublishedPortfolios);
router.get("/:slug", getPortfolioBySlug);

// ==================================================
// ADMIN - WRITE
// ==================================================

router.post("/", protect, createPortfolio);
// Legacy path kept for older clients
router.post("/create", protect, createPortfolio);
router.put("/:id", protect, validateObjectId, updatePortfolio);
router.delete("/:id", protect, validateObjectId, deletePortfolio);

module.exports = router;
