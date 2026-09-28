const express = require("express");

const FAQ = require("../models/FAQ");

const {
  getPublishedFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

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

router.get("/admin/all", protect, listAll(FAQ, { displayOrder: 1, createdAt: -1 }));
router.get("/admin/:id", protect, validateObjectId, getById(FAQ));

// ==================================================
// PUBLIC
// ==================================================

router.get("/", getPublishedFAQs);

// ==================================================
// ADMIN - WRITE
// ==================================================

router.post("/", protect, createFAQ);
router.put("/:id", protect, validateObjectId, updateFAQ);
router.delete("/:id", protect, validateObjectId, deleteFAQ);

module.exports = router;
