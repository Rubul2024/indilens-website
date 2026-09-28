const express = require("express");

const Service = require("../models/Service");

const {
  getPublishedServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

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

router.get("/admin/all", protect, listAll(Service, { displayOrder: 1, createdAt: -1 }));
router.get("/admin/:id", protect, validateObjectId, getById(Service));

// ==================================================
// PUBLIC
// ==================================================

router.get("/", getPublishedServices);
router.get("/:slug", getServiceBySlug);

// ==================================================
// ADMIN - WRITE
// ==================================================

router.post("/", protect, createService);
router.put("/:id", protect, validateObjectId, updateService);
router.delete("/:id", protect, validateObjectId, deleteService);

module.exports = router;
