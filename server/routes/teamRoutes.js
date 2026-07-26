const express = require("express");

// ==================================================
// IMPORT TEAM CONTROLLER
// ==================================================

const {
  getPublishedTeam,

  createTeamMember,

  updateTeamMember,

  deleteTeamMember,
} = require("../controllers/teamController");

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
// GET ALL PUBLISHED TEAM MEMBERS
// GET /api/team
// ==================================================

router.get(
  "/",

  getPublishedTeam,
);

// ==================================================
// ADMIN
// CREATE TEAM MEMBER
// POST /api/team
// ==================================================

router.post(
  "/",

  protect,

  createTeamMember,
);

// ==================================================
// ADMIN
// UPDATE TEAM MEMBER
// PUT /api/team/:id
// ==================================================

router.put(
  "/:id",

  protect,

  updateTeamMember,
);

// ==================================================
// ADMIN
// DELETE TEAM MEMBER
// DELETE /api/team/:id
// ==================================================

router.delete(
  "/:id",

  protect,

  deleteTeamMember,
);

// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;
