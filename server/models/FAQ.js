
const mongoose = require("mongoose");


// ==================================================
// FAQ SCHEMA
// ==================================================

const faqSchema = new mongoose.Schema(
  {

    // ==================================================
    // FAQ QUESTION
    // Example:
    // How long does it take to build a website?
    // ==================================================

    question: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // FAQ ANSWER
    // ==================================================

    answer: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // FAQ CATEGORY
    //
    // Example:
    // General
    // Web Development
    // Services
    // Pricing
    // Support
    // ==================================================

    category: {
      type: String,
      default: "General",
      trim: true,
    },


    // ==================================================
    // FAQ DISPLAY ORDER
    //
    // Smaller number appears first
    //
    // Example:
    // 1 = First FAQ
    // 2 = Second FAQ
    // 3 = Third FAQ
    // ==================================================

    displayOrder: {
      type: Number,
      default: 0,
    },


    // ==================================================
    // FEATURED FAQ
    //
    // true  = Important / Featured FAQ
    // false = Normal FAQ
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
// CREATE FAQ MODEL
// ==================================================

const FAQ = mongoose.model(
  "FAQ",
  faqSchema
);


// ==================================================
// EXPORT FAQ MODEL
// ==================================================

module.exports = FAQ;