const mongoose = require("mongoose");


// ==================================================
// TEAM SCHEMA
// ==================================================

const teamSchema = new mongoose.Schema(
  {

    // ==================================================
    // TEAM MEMBER NAME
    // Example:
    // John Doe
    // ==================================================

    name: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // TEAM MEMBER ROLE
    // Example:
    // Founder & CEO
    // Full Stack Developer
    // UI/UX Designer
    // ==================================================

    role: {
      type: String,
      required: true,
      trim: true,
    },


    // ==================================================
    // SHORT BIO
    // Used for Team Cards
    // ==================================================

    shortBio: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // FULL BIO
    // Optional detailed biography
    // ==================================================

    bio: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // PROFILE IMAGE
    //
    // Later this can contain a Cloudinary URL
    // ==================================================

    profileImage: {
      type: String,
      default: "",
    },


    // ==================================================
    // EMAIL
    // ==================================================

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },


    // ==================================================
    // LINKEDIN PROFILE
    // ==================================================

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // GITHUB PROFILE
    // ==================================================

    github: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // WEBSITE
    // ==================================================

    website: {
      type: String,
      default: "",
      trim: true,
    },


    // ==================================================
    // TEAM CATEGORY
    //
    // Example:
    // Management
    // Development
    // Design
    // Marketing
    // ==================================================

    department: {
      type: String,
      default: "General",
      trim: true,
    },


    // ==================================================
    // FEATURED TEAM MEMBER
    //
    // true  = Featured
    // false = Normal
    // ==================================================

    isFeatured: {
      type: Boolean,
      default: false,
    },


    // ==================================================
    // PUBLISHED STATUS
    //
    // true  = Visible to public
    // false = Hidden
    // ==================================================

    isPublished: {
      type: Boolean,
      default: false,
    },


    // ==================================================
    // DISPLAY ORDER
    //
    // Smaller number appears first
    //
    // 1 = First
    // 2 = Second
    // 3 = Third
    // ==================================================

    displayOrder: {
      type: Number,
      default: 0,
    },


    // ==================================================
    // JOINED DATE
    // ==================================================

    joinedAt: {
      type: Date,
      default: null,
    },

  },

  {
    timestamps: true,
  }
);


// ==================================================
// CREATE TEAM MODEL
// ==================================================

const Team = mongoose.model(
  "Team",
  teamSchema
);


// ==================================================
// EXPORT TEAM MODEL
// ==================================================

module.exports = Team;