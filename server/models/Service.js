const mongoose = require("mongoose");


// ==================================================
// SERVICE SCHEMA
// ==================================================

const serviceSchema = new mongoose.Schema(
  {

    // ==================================================
    // SERVICE NAME
    // Example:
    // Web Development
    // ==================================================

    title: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // SERVICE SLUG
    // Example:
    // web-development
    // ==================================================

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },


    // ==================================================
    // SHORT SERVICE DESCRIPTION
    // Used for Service Cards
    // ==================================================

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // FULL SERVICE DESCRIPTION
    // ==================================================

    description: {
      type: String,
      required: true,
    },


    // ==================================================
    // SERVICE ICON
    //
    // Example:
    // "Globe"
    // "Code"
    // "Smartphone"
    //
    // This can be used by React frontend
    // ==================================================

    icon: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // SERVICE IMAGE
    // ==================================================

    featuredImage: {
      type: String,
      default: "",
    },


    // ==================================================
    // SERVICE CATEGORY
    // ==================================================

    category: {
      type: String,
      default: "Technology",
      trim: true,
    },


    // ==================================================
    // FEATURED SERVICE
    //
    // true  = Show in Featured Services
    // false = Normal Service
    // ==================================================

    isFeatured: {
      type: Boolean,
      default: false,
    },


    // ==================================================
    // PUBLISHED STATUS
    //
    // true  = Visible to public
    // false = Hidden / Draft
    // ==================================================

    isPublished: {
      type: Boolean,
      default: false,
    },


    // ==================================================
    // SERVICE DISPLAY ORDER
    //
    // Smaller number appears first
    //
    // Example:
    // 1 = First
    // 2 = Second
    // 3 = Third
    // ==================================================

    displayOrder: {
      type: Number,
      default: 0,
    },


    // ==================================================
    // PUBLISHED DATE
    // ==================================================

    publishedAt: {
      type: Date,
      default: null,
    },

  },

  {
    timestamps: true,
  }
);


// ==================================================
// CREATE SERVICE MODEL
// ==================================================

const Service = mongoose.model(
  "Service",
  serviceSchema
);


// ==================================================
// EXPORT SERVICE MODEL
// ==================================================

module.exports = Service;