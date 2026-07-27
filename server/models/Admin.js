const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    // ==========================================
    // ADMIN NAME
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // ADMIN EMAIL
    // ==========================================

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ==========================================
    // ADMIN PASSWORD
    // ==========================================

    password: {
      type: String,
      required: true,
    },

    // ==========================================
    // ADMIN ROLE
    // ==========================================

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    // ==========================================
    // ADMIN ACTIVE STATUS
    // ==========================================

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

// ==========================================
// EXPORT ADMIN MODEL
// ==========================================

module.exports = mongoose.model("Admin", adminSchema);