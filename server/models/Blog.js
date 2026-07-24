
const mongoose = require("mongoose");


// ==================================================
// BLOG SCHEMA
// ==================================================

const blogSchema = new mongoose.Schema(
    {

        // ==========================================
        // BLOG TITLE
        // ==========================================

        title: {

            type: String,

            required: [
                true,
                "Blog title is required"
            ],

            trim: true,

        },


        // ==========================================
        // BLOG SLUG
        // Example:
        // "why-businesses-need-modern-websites"
        // ==========================================

        slug: {

            type: String,

            required: [
                true,
                "Blog slug is required"
            ],

            unique: true,

            lowercase: true,

            trim: true,

        },


        // ==========================================
        // BLOG EXCERPT
        // Short description
        // ==========================================

        excerpt: {

            type: String,

            required: [
                true,
                "Blog excerpt is required"
            ],

            trim: true,

        },


        // ==========================================
        // BLOG CONTENT
        // Full article
        // ==========================================

        content: {

            type: String,

            required: [
                true,
                "Blog content is required"
            ],

        },


        // ==========================================
        // FEATURED IMAGE
        // ==========================================

        featuredImage: {

            type: String,

            default: "",

        },


        // ==========================================
        // BLOG CATEGORY
        // ==========================================

        category: {

            type: String,

            default: "General",

            trim: true,

        },


        // ==========================================
        // AUTHOR
        // ==========================================

        author: {

            type: String,

            default: "Indilens",

            trim: true,

        },


        // ==========================================
        // PUBLISHED STATUS
        // false = Draft
        // true = Published
        // ==========================================

        isPublished: {

            type: Boolean,

            default: false,

        },


        // ==========================================
        // PUBLISHED DATE
        // ==========================================

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
// CREATE BLOG MODEL
// ==================================================

const Blog = mongoose.model(
    "Blog",
    blogSchema
);


// ==================================================
// EXPORT BLOG MODEL
// ==================================================

module.exports = Blog;