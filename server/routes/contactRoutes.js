const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const { validateObjectId } = require("../controllers/adminResourceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Limit public submissions to curb spam
const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent. Please try again later.",
  },
});

// ==========================================
// PUBLIC
// ==========================================

router.post("/", submitLimiter, createContact);

// ==========================================
// ADMIN
// ==========================================

router.get("/", protect, getAllContacts);
router.get("/:id", protect, validateObjectId, getContactById);
router.put("/:id", protect, validateObjectId, updateContact);
router.delete("/:id", protect, validateObjectId, deleteContact);

module.exports = router;
