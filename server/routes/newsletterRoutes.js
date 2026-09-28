const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  subscribeNewsletter,
  getAllSubscribers,
  getSubscriberById,
  updateSubscriber,
  deleteSubscriber,
} = require("../controllers/newsletterController");

const { validateObjectId } = require("../controllers/adminResourceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Limit public sign-ups to curb spam
const subscribeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ==================================================
// PUBLIC
// ==================================================

router.post("/", subscribeLimiter, subscribeNewsletter);

// ==================================================
// ADMIN
// ==================================================

router.get("/", protect, getAllSubscribers);
router.get("/:id", protect, validateObjectId, getSubscriberById);
router.put("/:id", protect, validateObjectId, updateSubscriber);
router.delete("/:id", protect, validateObjectId, deleteSubscriber);

module.exports = router;
