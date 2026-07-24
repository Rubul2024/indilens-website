const express = require("express");

// ==================================================
// IMPORT BLOG CONTROLLER
// ==================================================

const {
  getPublishedBlogs,

  getBlogBySlug,

  createBlog,

  updateBlog,

  deleteBlog,
} = require("../controllers/blogController");

// ==================================================
// IMPORT ADMIN AUTH MIDDLEWARE
// ==================================================

const { protect } = require("../middleware/authMiddleware");

// ==================================================
// CREATE ROUTER
// ==================================================

const router = express.Router();

// ==================================================
// PUBLIC
// GET ALL PUBLISHED BLOGS
// GET /api/blog
// ==================================================

router.get(
  "/",

  getPublishedBlogs,
);

// ==================================================
// PUBLIC
// GET SINGLE BLOG BY SLUG
// GET /api/blog/:slug
// ==================================================

router.get(
  "/:slug",

  getBlogBySlug,
);

// ==================================================
// ADMIN
// CREATE BLOG
// POST /api/blog
// ==================================================

router.post(
  "/",

  protect,

  createBlog,
);

// ==================================================
// ADMIN
// UPDATE BLOG
// PUT /api/blog/:id
// ==================================================

router.put(
  "/:id",

  protect,

  updateBlog,
);

// ==================================================
// ADMIN
// DELETE BLOG
// DELETE /api/blog/:id
// ==================================================

router.delete(
  "/:id",

  protect,

  deleteBlog,
);

// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;
