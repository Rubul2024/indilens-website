

const mongoose = require("mongoose");


// ==================================================
// PORTFOLIO SCHEMA
// ==================================================

const portfolioSchema = new mongoose.Schema(
  {

    // ==================================================
    // PROJECT TITLE
    // ==================================================

    title: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // PROJECT SLUG
    // Example:
    // indilens-corporate-website
    // ==================================================

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },


    // ==================================================
    // SHORT PROJECT DESCRIPTION
    // ==================================================

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // FULL PROJECT DESCRIPTION
    // ==================================================

    description: {
      type: String,
      required: true,
    },


    // ==================================================
    // PROJECT IMAGE
    // ==================================================

    featuredImage: {
      type: String,
      default: "",
    },


    // ==================================================
    // PROJECT CATEGORY
    // Example:
    // Web Development
    // Software Development
    // E-commerce
    // ==================================================

    category: {
      type: String,
      default: "Web Development",
      trim: true,
    },


    // ==================================================
    // CLIENT NAME
    // ==================================================

    clientName: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // TECHNOLOGIES USED
    // Example:
    // ["React", "Node.js", "MongoDB"]
    // ==================================================

    technologies: {
      type: [String],
      default: [],
    },


    // ==================================================
    // LIVE WEBSITE URL
    // ==================================================

    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // GITHUB URL
    // ==================================================

    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // FEATURED PROJECT
    // true = Show as featured project
    // false = Normal project
    // ==================================================

    isFeatured: {
      type: Boolean,
      default: false,
    },


    // ==================================================
    // PUBLISHED STATUS
    // true = Visible to public
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
// CREATE PORTFOLIO MODEL
// ==================================================

const Portfolio = mongoose.model(
  "Portfolio",
  portfolioSchema
);


// ==================================================
// EXPORT MODEL
// ==================================================

module.exports = Portfolio;