import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AdminServiceForm.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminServiceForm = () => {
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
    shortDescription: "",
    description: "",
    icon: "",
    isPublished: false,
  });

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(isEditMode);

  // ========================================
  // SUBMIT LOADING
  // ========================================

  const [submitting, setSubmitting] = useState(false);

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // SUCCESS
  // ========================================

  const [success, setSuccess] = useState("");

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // FETCH SERVICE FOR EDIT
  // ========================================

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchService = async () => {
      try {
        setLoading(true);

        setError("");

        // ========================================
        // GET TOKEN
        // ========================================

        const token = localStorage.getItem("adminToken");

        if (!token) {
          navigate("/admin/login");
          return;
        }

        // ========================================
        // GET SERVICE
        // ========================================

        const response = await fetch(`${API_URL}/api/services/${id}`, {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ========================================
        // RESPONSE
        // ========================================

        const data = await response.json();

        // ========================================
        // CHECK RESPONSE
        // ========================================

        if (!response.ok) {
          throw new Error(data.message || "Unable to load service.");
        }

        // ========================================
        // SET FORM DATA
        // ========================================

        const service = data.data;

        setFormData({
          title: service.title || "",

          slug: service.slug || "",

          category: service.category || "",

          shortDescription: service.shortDescription || "",

          description: service.description || "",

          icon: service.icon || "",

          isPublished: service.isPublished || false,
        });
      } catch (error) {
        console.error("Load Service Error:", error);

        setError(error.message || "Unable to load service.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, isEditMode, navigate]);

  // ========================================
  // SUBMIT FORM
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      setError("");

      setSuccess("");

      // ========================================
      // GET TOKEN
      // ========================================

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      // ========================================
      // API URL
      // ========================================

      const url = isEditMode
        ? `${API_URL}/api/services/${id}`
        : `${API_URL}/api/services`;

      // ========================================
      // METHOD
      // ========================================

      const method = isEditMode ? "PUT" : "POST";

      // ========================================
      // API REQUEST
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
      // RESPONSE
      // ========================================

      const data = await response.json();

      // ========================================
      // CHECK RESPONSE
      // ========================================

      if (!response.ok) {
        throw new Error(data.message || "Unable to save service.");
      }

      // ========================================
      // SUCCESS MESSAGE
      // ========================================

      setSuccess(
        isEditMode
          ? "Service updated successfully."
          : "Service created successfully.",
      );

      // ========================================
      // REDIRECT
      // ========================================

      setTimeout(() => {
        navigate("/admin/services");
      }, 1000);
    } catch (error) {
      console.error("Save Service Error:", error);

      setError(error.message || "Unable to save service.");
    } finally {
      setSubmitting(false);
    }
  };

  // ========================================
  // LOADING STATE
  // ========================================

  if (loading) {
    return (
      <div className="admin-service-form-page">
        <div className="admin-service-form-loading">Loading service...</div>
      </div>
    );
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="admin-service-form-page">
      {/* ========================================
          HEADER
      ======================================== */}

      <header className="admin-service-form-header">
        <div>
          <span className="admin-service-form-label">SERVICE MANAGEMENT</span>

          <h1>{isEditMode ? "Edit Service" : "Create Service"}</h1>

          <p>
            {isEditMode
              ? "Update your existing service information."
              : "Add a new service to your Indilens website."}
          </p>
          <button
            type="button"
            className="back-dashboard-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Return to Dashboard
          </button>
        </div>

        <button
          className="admin-service-back-btn"
          onClick={() => navigate("/admin/services")}
        >
          ← Back to Services
        </button>
      </header>

      {/* ========================================
          FORM CARD
      ======================================== */}

      <section className="admin-service-form-card">
        {/* ========================================
            ERROR
        ======================================== */}

        {error && <div className="admin-service-form-error">{error}</div>}

        {/* ========================================
            SUCCESS
        ======================================== */}

        {success && <div className="admin-service-form-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* ========================================
              TITLE + SLUG
          ======================================== */}

          <div className="admin-service-form-row">
            <div className="admin-service-form-group">
              <label>
                Service Title
                <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter service title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-service-form-group">
              <label>Slug</label>

              <input
                type="text"
                name="slug"
                placeholder="example-service"
                value={formData.slug}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ========================================
              CATEGORY + ICON
          ======================================== */}

          <div className="admin-service-form-row">
            <div className="admin-service-form-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                placeholder="Web Development"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="admin-service-form-group">
              <label>Icon</label>

              <input
                type="text"
                name="icon"
                placeholder="🌐"
                value={formData.icon}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ========================================
              SHORT DESCRIPTION
          ======================================== */}

          <div className="admin-service-form-group">
            <label>Short Description</label>

            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Enter a short description"
              rows="4"
            />
          </div>

          {/* ========================================
              FULL DESCRIPTION
          ======================================== */}

          <div className="admin-service-form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter complete service description"
              rows="8"
              required
            />
          </div>

          {/* ========================================
              PUBLISH STATUS
          ======================================== */}

          <div className="admin-service-publish">
            <label className="admin-service-checkbox">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />

              <span>Publish this service</span>
            </label>

            <small>
              Published services can be displayed on the public website.
            </small>
          </div>

          {/* ========================================
              ACTIONS
          ======================================== */}

          <div className="admin-service-form-actions">
            <button
              type="button"
              className="admin-service-cancel-btn"
              onClick={() => navigate("/admin/services")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-service-submit-btn"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : isEditMode
                  ? "Update Service"
                  : "Create Service"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdminServiceForm;
