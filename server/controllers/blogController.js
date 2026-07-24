const Blog = require("../models/Blog");


// ==================================================
// 1. PUBLIC - GET ALL PUBLISHED BLOGS
// GET /api/blog
// ==================================================

const getPublishedBlogs = async (req, res) => {

    try {

        const blogs =
            await Blog.find({

                isPublished: true,

            })
            .sort({

                publishedAt: -1,

            });


        return res.status(200).json({

            success: true,

            count: blogs.length,

            data: blogs,

        });


    } catch (error) {

        console.error(
            "Get Published Blogs Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to get published blogs.",

        });

    }

};



// ==================================================
// 2. PUBLIC - GET SINGLE BLOG BY SLUG
// GET /api/blog/:slug
// ==================================================

const getBlogBySlug = async (req, res) => {

    try {

        const blog =
            await Blog.findOne({

                slug:
                    req.params.slug,

                isPublished: true,

            });


        if (!blog) {

            return res.status(404).json({

                success: false,

                message:
                    "Blog not found.",

            });

        }


        return res.status(200).json({

            success: true,

            data: blog,

        });


    } catch (error) {

        console.error(
            "Get Blog Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to get blog.",

        });

    }

};



// ==================================================
// 3. ADMIN - CREATE BLOG
// POST /api/blog
// ==================================================

const createBlog = async (req, res) => {

    try {

        const {

            title,

            slug,

            excerpt,

            content,

            featuredImage,

            category,

            author,

            isPublished,

        } = req.body;


        // ==========================================
        // CHECK REQUIRED FIELDS
        // ==========================================

        if (
            !title ||
            !slug ||
            !excerpt ||
            !content
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Title, slug, excerpt and content are required.",

            });

        }


        // ==========================================
        // CLEAN SLUG
        // ==========================================

        const cleanSlug =
            slug
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-");


        // ==========================================
        // CHECK DUPLICATE SLUG
        // ==========================================

        const existingBlog =
            await Blog.findOne({

                slug: cleanSlug,

            });


        if (existingBlog) {

            return res.status(409).json({

                success: false,

                message:
                    "A blog with this slug already exists.",

            });

        }


        // ==========================================
        // CREATE BLOG
        // ==========================================

        const blog =
            await Blog.create({

                title:
                    title.trim(),

                slug:
                    cleanSlug,

                excerpt:
                    excerpt.trim(),

                content,

                featuredImage:
                    featuredImage || "",

                category:
                    category || "General",

                author:
                    author || "Indilens",

                isPublished:
                    isPublished === true,

                publishedAt:
                    isPublished === true
                        ? new Date()
                        : null,

            });


        return res.status(201).json({

            success: true,

            message:
                "Blog created successfully.",

            data: blog,

        });


    } catch (error) {

        console.error(
            "Create Blog Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to create blog.",

        });

    }

};



// ==================================================
// 4. ADMIN - UPDATE BLOG
// PUT /api/blog/:id
// ==================================================

const updateBlog = async (req, res) => {

    try {

        const blog =
            await Blog.findById(
                req.params.id
            );


        if (!blog) {

            return res.status(404).json({

                success: false,

                message:
                    "Blog not found.",

            });

        }


        const {

            title,

            slug,

            excerpt,

            content,

            featuredImage,

            category,

            author,

            isPublished,

        } = req.body;


        // ==========================================
        // UPDATE BASIC FIELDS
        // ==========================================

        if (title !== undefined) {

            blog.title =
                title.trim();

        }


        if (excerpt !== undefined) {

            blog.excerpt =
                excerpt.trim();

        }


        if (content !== undefined) {

            blog.content =
                content;

        }


        if (
            featuredImage !== undefined
        ) {

            blog.featuredImage =
                featuredImage;

        }


        if (category !== undefined) {

            blog.category =
                category;

        }


        if (author !== undefined) {

            blog.author =
                author;

        }


        // ==========================================
        // UPDATE SLUG
        // ==========================================

        if (slug !== undefined) {

            const cleanSlug =
                slug
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-");


            const duplicateBlog =
                await Blog.findOne({

                    slug: cleanSlug,

                    _id: {
                        $ne:
                            req.params.id
                    },

                });


            if (duplicateBlog) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Another blog already uses this slug.",

                });

            }


            blog.slug =
                cleanSlug;

        }


        // ==========================================
        // UPDATE PUBLISHED STATUS
        // ==========================================

        if (
            isPublished !== undefined
        ) {

            blog.isPublished =
                isPublished;


            if (
                isPublished === true &&
                !blog.publishedAt
            ) {

                blog.publishedAt =
                    new Date();

            }


            if (
                isPublished === false
            ) {

                blog.publishedAt =
                    null;

            }

        }


        // ==========================================
        // SAVE BLOG
        // ==========================================

        await blog.save();


        return res.status(200).json({

            success: true,

            message:
                "Blog updated successfully.",

            data: blog,

        });


    } catch (error) {

        console.error(
            "Update Blog Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update blog.",

        });

    }

};



// ==================================================
// 5. ADMIN - DELETE BLOG
// DELETE /api/blog/:id
// ==================================================

const deleteBlog = async (req, res) => {

    try {

        const blog =
            await Blog.findById(
                req.params.id
            );


        if (!blog) {

            return res.status(404).json({

                success: false,

                message:
                    "Blog not found.",

            });

        }


        await Blog.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Blog deleted successfully.",

        });


    } catch (error) {

        console.error(
            "Delete Blog Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete blog.",

        });

    }

};



// ==================================================
// EXPORT ALL BLOG FUNCTIONS
// ==================================================

module.exports = {

    getPublishedBlogs,

    getBlogBySlug,

    createBlog,

    updateBlog,

    deleteBlog,

};