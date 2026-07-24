const express = require("express");

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC CONTACT API
// ==========================================

// Anyone can submit a contact form

router.post("/", createContact);

// ==========================================
// PROTECTED CONTACT APIs
// ==========================================

// Only authenticated Admin can access these

router.get("/", protect, getAllContacts);

router.get("/:id", protect, getContactById);

router.put("/:id", protect, updateContact);

router.delete("/:id", protect, deleteContact);

module.exports = router;
