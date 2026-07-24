const express = require("express");


// ==================================================
// IMPORT SERVICE CONTROLLER
// ==================================================

const {

  getPublishedServices,

  getServiceBySlug,

  createService,

  updateService,

  deleteService,

} = require(
  "../controllers/serviceController"
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
// GET ALL PUBLISHED SERVICES
// GET /api/services
// ==================================================

router.get(

  "/",

  getPublishedServices

);


// ==================================================
// PUBLIC
// GET SINGLE SERVICE BY SLUG
// GET /api/services/:slug
// ==================================================

router.get(

  "/:slug",

  getServiceBySlug

);


// ==================================================
// ADMIN
// CREATE SERVICE
// POST /api/services
// ==================================================

router.post(

  "/",

  protect,

  createService

);


// ==================================================
// ADMIN
// UPDATE SERVICE
// PUT /api/services/:id
// ==================================================

router.put(

  "/:id",

  protect,

  updateService

);


// ==================================================
// ADMIN
// DELETE SERVICE
// DELETE /api/services/:id
// ==================================================

router.delete(

  "/:id",

  protect,

  deleteService

);


// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;