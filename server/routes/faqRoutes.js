const express = require("express");


// ==================================================
// IMPORT FAQ CONTROLLER
// ==================================================

const {

  getPublishedFAQs,

  createFAQ,

  updateFAQ,

  deleteFAQ,

} = require(
  "../controllers/faqController"
);


// ==================================================
// IMPORT ADMIN AUTH MIDDLEWARE
// ==================================================

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);


// ==================================================
// CREATE ROUTER
// ==================================================

const router =
  express.Router();


// ==================================================
// PUBLIC
// GET ALL PUBLISHED FAQS
// GET /api/faq
// ==================================================

router.get(

  "/",

  getPublishedFAQs

);


// ==================================================
// ADMIN
// CREATE FAQ
// POST /api/faq
// ==================================================

router.post(

  "/",

  protect,

  createFAQ

);


// ==================================================
// ADMIN
// UPDATE FAQ
// PUT /api/faq/:id
// ==================================================

router.put(

  "/:id",

  protect,

  updateFAQ

);


// ==================================================
// ADMIN
// DELETE FAQ
// DELETE /api/faq/:id
// ==================================================

router.delete(

  "/:id",

  protect,

  deleteFAQ

);


// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;