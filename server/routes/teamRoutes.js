const express = require("express");

const Team = require("../models/Team");

const {
  getPublishedTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

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

router.get("/admin/all", protect, listAll(Team, { displayOrder: 1, createdAt: -1 }));
router.get("/admin/:id", protect, validateObjectId, getById(Team));

// ==================================================
// PUBLIC
// ==================================================

router.get("/", getPublishedTeam);

// ==================================================
// ADMIN - WRITE
// ==================================================

router.post("/", protect, createTeamMember);
router.put("/:id", protect, validateObjectId, updateTeamMember);
router.delete("/:id", protect, validateObjectId, deleteTeamMember);

module.exports = router;
