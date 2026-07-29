import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminBlogs.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminBlogs = () => {
  const navigate = useNavigate();

  // ========================================
  // BLOGS STATE
  // ========================================

  const [blogs, setBlogs] = useState([]);

  // ========================================
  // LOADING STATE
  // ========================================

  const [loading, setLoading] = useState(true);

  // ========================================
  // ERROR STATE
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // FETCH BLOGS
  // ========================================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      setError("");

      // ========================================
      // GET ADMIN JWT TOKEN
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
      // API REQUEST
      // ========================================

      const response = await fetch(`${API_URL}/api/blog`, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ========================================
      // GET RESPONSE DATA
      // ========================================

      const data = await response.json();

      // ========================================
      // CHECK RESPONSE
      // ========================================

      if (!response.ok) {
        throw new Error(data.message || "Unable to load blog posts.");
      }

      // ========================================
      // SAVE BLOGS
      // ========================================

      setBlogs(data.data || []);
    } catch (error) {
      console.error("Blog Management Error:", error);

      setError(error.message || "Unable to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD BLOGS WHEN PAGE OPENS
  // ========================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ========================================
  // DELETE BLOG
  // ========================================

  const handleDelete = async (id) => {
    // ========================================
    // CONFIRM DELETE
    // ========================================

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?",
    );

    if (!confirmed) {
      return;
    }

    try {
      // ========================================
      // GET JWT TOKEN
      // ========================================

      const token = localStorage.getItem("adminToken");

      // ========================================
      // DELETE API REQUEST
      // ========================================

      const response = await fetch(`${API_URL}/api/blog/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ========================================
      // GET RESPONSE DATA
      // ========================================

      const data = await response.json();

      // ========================================
      // CHECK RESPONSE
      // ========================================

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete blog post.");
      }

      // ========================================
      // REMOVE BLOG FROM UI
      // ========================================

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog._id !== id),
      );
    } catch (error) {
      console.error("Delete Blog Error:", error);

      setError(error.message || "Unable to delete blog post.");
    }
  };

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ========================================
  // GET PUBLISHED STATUS
  // ========================================

  const getPublishedStatus = (blog) => {
    if (blog.isPublished === true) {
      return "Published";
    }

    return "Draft";
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="admin-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <header className="admin-page-header">
        <div>
          <span className="admin-page-label">CONTENT</span>

          <h1>Blog Management</h1>

          <p>Create, manage, and organize your Indilens blog articles.</p>
        </div>

        <div className="admin-header-actions">
          <button
            className="admin-back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Dashboard
          </button>

          <button
            className="admin-create-btn"
            onClick={() => navigate("/admin/blogs/create")}
          >
            + Create Blog
          </button>
        </div>
      </header>

      {/* ========================================
          ERROR MESSAGE
      ======================================== */}

      {error && <div className="admin-error">{error}</div>}

      {/* ========================================
          BLOG MANAGEMENT CARD
      ======================================== */}

      <section className="admin-page-card">
        {/* ========================================
            CARD HEADER
        ======================================== */}

        <div className="admin-card-header">
          <div>
            <span className="admin-card-label">CONTENT MANAGEMENT</span>

            <h2>All Blog Posts</h2>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={fetchBlogs}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>

        {/* ========================================
            LOADING STATE
        ======================================== */}

        {loading && (
          <div className="admin-loading">
            <div className="admin-spinner"></div>

            <p>Loading blog posts...</p>
          </div>
        )}

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {!loading && !error && blogs.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty-icon">◫</div>

            <h3>No Blog Posts Yet</h3>

            <p>Create your first blog post to display it here.</p>

            <button
              className="admin-create-btn"
              onClick={() => navigate("/admin/blogs/create")}
            >
              + Create Your First Blog
            </button>
          </div>
        )}

        {/* ========================================
            BLOG TABLE
        ======================================== */}

        {!loading && blogs.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Serial No.</th>

                  <th>Title</th>

                  <th>Category</th>

                  <th>Author</th>

                  <th>Status</th>

                  <th>Date</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    {/* SERIAL NUMBER */}

                    <td>{index + 1}</td>

                    {/* TITLE */}

                    <td>
                      <strong className="blog-title">
                        {blog.title || "Untitled Blog"}
                      </strong>
                    </td>

                    {/* CATEGORY */}

                    <td>{blog.category || "—"}</td>

                    {/* AUTHOR */}

                    <td>{blog.author || "Admin"}</td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={
                          blog.isPublished
                            ? "status-badge status-published"
                            : "status-badge status-draft"
                        }
                      >
                        {getPublishedStatus(blog)}
                      </span>
                    </td>

                    {/* DATE */}

                    <td>{formatDate(blog.createdAt)}</td>

                    {/* ACTIONS */}

                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-view-btn"
                          onClick={() =>
                            navigate(`/admin/blogs/view/${blog._id}`)
                          }
                        >
                          View
                        </button>

                        <button
                          className="admin-edit-btn"
                          onClick={() =>
                            navigate(`/admin/blogs/edit/${blog._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminBlogs;
