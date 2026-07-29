import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AdminBlogForm.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminBlogForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  // ========================================
  // CHECK EDIT MODE
  // ========================================

  const isEditMode = Boolean(id);

  // ========================================
  // FORM DATA
  // ========================================

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    author: "",
    image: "",
    excerpt: "",
    content: "",
    isPublished: false,
  });

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(false);

  // ========================================
  // PAGE LOADING
  // ========================================

  const [pageLoading, setPageLoading] = useState(isEditMode);

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // SUCCESS
  // ========================================

  const [success, setSuccess] = useState("");

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // AUTO GENERATE SLUG
  // ========================================

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  };

  // ========================================
  // HANDLE TITLE CHANGE
  // ========================================

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setFormData((previousData) => ({
      ...previousData,
      title,
      slug: isEditMode ? previousData.slug : generateSlug(title),
    }));
  };

  // ========================================
  // FETCH SINGLE BLOG FOR EDIT
  // ========================================

  useEffect(() => {
    if (!isEditMode) {
      setPageLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        setPageLoading(true);

        setError("");

        // ========================================
        // GET JWT TOKEN
        // ========================================

        const token = localStorage.getItem("adminToken");

        if (!token) {
          navigate("/admin/login");
          return;
        }

        // ========================================
        // GET SINGLE BLOG
        // ========================================

        const response = await fetch(`${API_URL}/api/blog/${id}`, {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        // ========================================
        // CHECK RESPONSE
        // ========================================

        if (!response.ok) {
          throw new Error(data.message || "Unable to load blog.");
        }

        // ========================================
        // GET BLOG DATA
        // ========================================

        const blog = data.data;

        // ========================================
        // SET FORM DATA
        // ========================================

        setFormData({
          title: blog.title || "",

          slug: blog.slug || "",

          category: blog.category || "",

          author: blog.author || "",

          image: blog.image || "",

          excerpt: blog.excerpt || "",

          content: blog.content || "",

          isPublished: blog.isPublished || false,
        });
      } catch (error) {
        console.error("Fetch Blog Error:", error);

        setError(error.message || "Unable to load blog.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchBlog();
  }, [id, isEditMode, navigate]);

  // ========================================
  // HANDLE FORM SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      // ========================================
      // GET JWT TOKEN
      // ========================================

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      // ========================================
      // DETERMINE METHOD
      // ========================================

      const method = isEditMode ? "PUT" : "POST";

      // ========================================
      // DETERMINE URL
      // ========================================

      const url = isEditMode
        ? `${API_URL}/api/blog/${id}`
        : `${API_URL}/api/blog`;

      // ========================================
      // SEND REQUEST
      // ========================================

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      // ========================================
      // GET RESPONSE
      // ========================================

      const data = await response.json();

      // ========================================
      // CHECK RESPONSE
      // ========================================

      if (!response.ok) {
        throw new Error(data.message || "Unable to save blog.");
      }

      // ========================================
      // SUCCESS MESSAGE
      // ========================================

      setSuccess(
        isEditMode
          ? "Blog updated successfully."
          : "Blog created successfully.",
      );

      // ========================================
      // REDIRECT TO BLOG LIST
      // ========================================

      setTimeout(() => {
        navigate("/admin/blogs");
      }, 1000);
    } catch (error) {
      console.error("Save Blog Error:", error);

      setError(error.message || "Unable to save blog.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // PAGE LOADING
  // ========================================

  if (pageLoading) {
    return (
      <div className="admin-blog-form-page">
        <div className="admin-form-loading">Loading blog...</div>
      </div>
    );
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="admin-blog-form-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <header className="admin-form-header">
        <div>
          <span className="admin-form-label">CONTENT MANAGEMENT</span>

          <h1>{isEditMode ? "Edit Blog" : "Create New Blog"}</h1>

          <p>
            {isEditMode
              ? "Update your blog article and publish changes."
              : "Create a new article for the Indilens website."}
          </p>
        </div>

        <button
          className="admin-form-back-btn"
          onClick={() => navigate("/admin/blogs")}
        >
          ← Back to Blogs
        </button>
      </header>

      {/* ========================================
          ERROR MESSAGE
      ======================================== */}

      {error && <div className="admin-form-error">{error}</div>}

      {/* ========================================
          SUCCESS MESSAGE
      ======================================== */}

      {success && <div className="admin-form-success">{success}</div>}

      {/* ========================================
          FORM CARD
      ======================================== */}

      <section className="admin-blog-form-card">
        <form onSubmit={handleSubmit} className="admin-blog-form">
          {/* ========================================
              TITLE
          ======================================== */}

          <div className="admin-form-group">
            <label>
              Blog Title
              <span>*</span>
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleTitleChange}
              required
            />
          </div>

          {/* ========================================
              SLUG
          ======================================== */}

          <div className="admin-form-group">
            <label>
              Slug
              <span>*</span>
            </label>

            <input
              type="text"
              name="slug"
              placeholder="blog-post-url"
              value={formData.slug}
              onChange={handleChange}
              required
            />

            <small>Example: modern-web-development</small>
          </div>

          {/* ========================================
              TWO COLUMN ROW
          ======================================== */}

          <div className="admin-form-row">
            {/* CATEGORY */}

            <div className="admin-form-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                placeholder="Technology"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            {/* AUTHOR */}

            <div className="admin-form-group">
              <label>Author</label>

              <input
                type="text"
                name="author"
                placeholder="Admin"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ========================================
              IMAGE URL
          ======================================== */}

          <div className="admin-form-group">
            <label>Featured Image URL</label>

            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          {/* ========================================
              EXCERPT
          ======================================== */}

          <div className="admin-form-group">
            <label>Excerpt</label>

            <textarea
              name="excerpt"
              placeholder="Write a short description of the blog..."
              value={formData.excerpt}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {/* ========================================
              CONTENT
          ======================================== */}

          <div className="admin-form-group">
            <label>
              Blog Content
              <span>*</span>
            </label>

            <textarea
              name="content"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={handleChange}
              rows="12"
              required
            />
          </div>

          {/* ========================================
              PUBLISH STATUS
          ======================================== */}

          <div className="admin-publish-option">
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />

              <span>Publish this blog</span>
            </label>

            <p>Uncheck this option to save the blog as a draft.</p>
          </div>

          {/* ========================================
              FORM ACTIONS
          ======================================== */}

          <div className="admin-form-actions">
            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() => navigate("/admin/blogs")}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="admin-save-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : isEditMode
                  ? "Update Blog"
                  : "Create Blog"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdminBlogForm;
