

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
    // We will hash this password in the next steps
    password: {
      type: String,
      required: true,
    },

    // Admin role
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);