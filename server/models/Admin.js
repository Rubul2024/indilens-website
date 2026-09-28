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
      maxlength: 80,
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
    // ADMIN PASSWORD (bcrypt hash)
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

    // ==========================================
    // SECURITY METADATA
    // ==========================================

    // Tokens issued before this moment are rejected
    passwordChangedAt: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    // bcrypt hash of the ADMIN_PASSWORD env value last applied by ensureAdmin
    seedHash: {
      type: String,
      default: "",
      select: false,
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.seedHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ==========================================
// EXPORT ADMIN MODEL
// ==========================================

module.exports = mongoose.model("Admin", adminSchema);
