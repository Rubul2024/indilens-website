const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    // Admin's name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Admin's email address
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Admin's password
    password: {
      type: String,
      required: true,
    },

    // Admin role
    role: {
      type: String,
      default: "admin",
    },

    // Admin active status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);