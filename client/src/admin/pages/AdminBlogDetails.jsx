import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AdminBlogDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminBlogDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  // ========================================
  // BLOG DATA
  // ========================================

  const [blog, setBlog] = useState(null);

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(true);

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // FETCH BLOG
  // ========================================

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);

        setError("");

        // ========================================
        // GET JWT TOKEN
        // ========================================

        const token = localStorage.getItem("adminToken");

        // ========================================
        // CHECK TOKEN
        // ========================================

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

        // ========================================
        // GET RESPONSE
        // ========================================

        const data = await response.json();

        // ========================================
        // CHECK RESPONSE
        // ========================================

        if (!response.ok) {
          throw new Error(data.message || "Unable to load blog.");
        }

        // ========================================
        // SAVE BLOG
        // ========================================

        setBlog(data.data);
      } catch (error) {
        console.error("Blog Details Error:", error);

        setError(error.message || "Unable to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // ========================================
  // LOADING STATE
  // ========================================

  if (loading) {
    return (
      <div className="admin-blog-details-page">
        <div className="admin-blog-loading">Loading blog details...</div>
      </div>
    );
  }

  // ========================================
  // ERROR STATE
  // ========================================

  if (error) {
    return (
      <div className="admin-blog-details-page">
        <div className="admin-blog-error">
          <h2>Unable to Load Blog</h2>

          <p>{error}</p>

          <button onClick={() => navigate("/admin/blogs")}>
            ← Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // BLOG NOT FOUND
  // ========================================

  if (!blog) {
    return (
      <div className="admin-blog-details-page">
        <div className="admin-blog-error">
          <h2>Blog Not Found</h2>

          <p>The requested blog could not be found.</p>

          <button onClick={() => navigate("/admin/blogs")}>
            ← Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // FORMAT DATE
  // ========================================

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="admin-blog-details-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <header className="admin-blog-details-header">
        <div>
          <span className="admin-blog-details-label">BLOG PREVIEW</span>

          <h1>Blog Details</h1>

          <p>Preview and manage your blog article.</p>
        </div>

        <button
          className="admin-blog-back-btn"
          onClick={() => navigate("/admin/blogs")}
        >
          ← Back to Blogs
        </button>
      </header>

      {/* ========================================
          BLOG PREVIEW CARD
      ======================================== */}

      <article className="admin-blog-preview">
        {/* ========================================
            FEATURED IMAGE
        ======================================== */}

        {blog.image && (
          <div className="admin-blog-preview-image">
            <img src={blog.image} alt={blog.title || "Blog featured image"} />
          </div>
        )}

        {/* ========================================
            BLOG CONTENT
        ======================================== */}

        <div className="admin-blog-preview-content">
          {/* CATEGORY */}

          {blog.category && (
            <span className="admin-blog-category">{blog.category}</span>
          )}

          {/* TITLE */}

          <h2>{blog.title || "Untitled Blog"}</h2>

          {/* META */}

          <div className="admin-blog-meta">
            <span>Author: {blog.author || "Admin"}</span>

            <span>Date: {formattedDate}</span>

            <span className={blog.isPublished ? "published" : "draft"}>
              {blog.isPublished ? "Published" : "Draft"}
            </span>
          </div>

          {/* EXCERPT */}

          {blog.excerpt && (
            <div className="admin-blog-excerpt">
              <p>{blog.excerpt}</p>
            </div>
          )}

          {/* CONTENT */}

          <div className="admin-blog-content">
            {blog.content?.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {/* ========================================
          ACTIONS
      ======================================== */}

      <div className="admin-blog-details-actions">
        <button
          className="admin-blog-edit-btn"
          onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}
        >
          ✎ Edit Blog
        </button>

        <button
          className="admin-blog-list-btn"
          onClick={() => navigate("/admin/blogs")}
        >
          ← Back to Blog List
        </button>
      </div>
    </div>
  );
};

export default AdminBlogDetails;
