const mongoose = require("mongoose");

// ==================================================
// CONTACT SCHEMA
// ==================================================

const contactSchema = new mongoose.Schema(
  {
    // ==============================================
    // NAME
    // ==============================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ==============================================
    // EMAIL
    // ==============================================

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // ==============================================
    // PHONE
    // ==============================================

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // ==============================================
    // SUBJECT
    // ==============================================

    subject: {
      type: String,
      trim: true,
      default: "",
    },

    // ==============================================
    // MESSAGE
    // ==============================================

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // ==============================================
    // READ STATUS
    // ==============================================

    isRead: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// ==================================================
// EXPORT MODEL
// ==================================================

module.exports = mongoose.model("Contact", contactSchema);