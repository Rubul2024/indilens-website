const express = require("express");

const Blog = require("../models/Blog");

const {
  getPublishedBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const {
  validateObjectId,
  listAll,
  getById,
} = require("../controllers/adminResourceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ==================================================
// ADMIN - ALL RECORDS (drafts included) + BY ID
// Must be registered before the public "/:slug" route
// ==================================================

router.get("/admin/all", protect, listAll(Blog, { createdAt: -1 }));
router.get("/admin/:id", protect, validateObjectId, getById(Blog));

// ==================================================
// PUBLIC
// ==================================================

router.get("/", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);

// ==================================================
// ADMIN - WRITE
// ==================================================

router.post("/", protect, createBlog);
router.put("/:id", protect, validateObjectId, updateBlog);
router.delete("/:id", protect, validateObjectId, deleteBlog);

module.exports = router;
