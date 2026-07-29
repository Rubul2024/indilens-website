import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
} from "../../api/portfolioApi";

import "./AdminPortfolioForm.css";

// ========================================
// INITIAL FORM DATA
// ========================================

const initialFormData = {
  title: "",
  slug: "",
  category: "",
  client: "",
  shortDescription: "",
  description: "",
  image: "",
  liveUrl: "",
  githubUrl: "",
  technologies: "",
  isPublished: true,
};

// ========================================
// ADMIN PORTFOLIO FORM
// ========================================

const AdminPortfolioForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  // ========================================
  // CHECK EDIT MODE
  // ========================================

  const isEditMode = Boolean(id);

  // ========================================
  // FORM DATA
  // ========================================

  const [formData, setFormData] = useState(initialFormData);

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
  // LOAD PORTFOLIO FOR EDIT
  // ========================================

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadPortfolio = async () => {
      try {
        setPageLoading(true);

        setError("");

        const data = await getPortfolioById(id);

        const portfolio = data.data;

        if (!portfolio) {
          throw new Error("Portfolio project not found.");
        }

        // ========================================
        // SET EXISTING DATA
        // ========================================

        setFormData({
          title: portfolio.title || "",

          slug: portfolio.slug || "",

          category: portfolio.category || "",

          client: portfolio.client || "",

          shortDescription: portfolio.shortDescription || "",

          description: portfolio.description || "",

          image: portfolio.image || "",

          liveUrl: portfolio.liveUrl || "",

          githubUrl: portfolio.githubUrl || "",

          technologies: Array.isArray(portfolio.technologies)
            ? portfolio.technologies.join(", ")
            : portfolio.technologies || "",

          isPublished: portfolio.isPublished !== false,
        });
      } catch (error) {
        console.error("Load Portfolio Error:", error);

        setError(error.message || "Unable to load portfolio project.");
      } finally {
        setPageLoading(false);
      }
    };

    loadPortfolio();
  }, [id, isEditMode]);

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // AUTO GENERATE SLUG
  // ========================================

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setFormData((previousData) => ({
      ...previousData,

      title,

      slug:
        previousData.slug ||
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-"),
    }));
  };

  // ========================================
  // HANDLE FORM SUBMIT
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      // ========================================
      // PREPARE DATA
      // ========================================

      const payload = {
        ...formData,

        technologies: formData.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),
      };

      // ========================================
      // CREATE
      // ========================================

      if (!isEditMode) {
        await createPortfolio(payload);

        setSuccess("Portfolio project created successfully.");

        setTimeout(() => {
          navigate("/admin/portfolio");
        }, 1000);

        return;
      }

      // ========================================
      // UPDATE
      // ========================================

      await updatePortfolio(id, payload);

      setSuccess("Portfolio project updated successfully.");

      setTimeout(() => {
        navigate("/admin/portfolio");
      }, 1000);
    } catch (error) {
      console.error("Save Portfolio Error:", error);

      setError(error.message || "Unable to save portfolio project.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // PAGE LOADING
  // ========================================

  if (pageLoading) {
    return (
      <div className="portfolio-form-page">
        <div className="portfolio-form-loading">
          Loading portfolio project...
        </div>
      </div>
    );
  }

  // ========================================
  // RETURN UI
  // ========================================

  return (
    <div className="portfolio-form-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="portfolio-form-header">
        <div>
          <span className="admin-eyebrow">PORTFOLIO MANAGEMENT</span>

          <h1>{isEditMode ? "Edit Portfolio" : "Create Portfolio"}</h1>

          <p>
            {isEditMode
              ? "Update your portfolio project details."
              : "Add a new project to your Indilens portfolio."}
          </p>
        </div>

        {/* HEADER ACTIONS */}

        <div className="portfolio-form-actions">
          <button
            type="button"
            className="dashboard-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Dashboard
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/admin/portfolio")}
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>

      {/* ========================================
          FORM CARD
      ======================================== */}

      <div className="portfolio-form-card">
        {/* ERROR */}

        {error && <div className="form-error">{error}</div>}

        {/* SUCCESS */}

        {success && <div className="form-success">{success}</div>}

        {/* ========================================
            FORM
        ======================================== */}

        <form onSubmit={handleSubmit} className="portfolio-form">
          {/* ========================================
              BASIC INFORMATION
          ======================================== */}

          <div className="form-section">
            <div className="form-section-heading">
              <span>01</span>

              <div>
                <h2>Basic Information</h2>

                <p>Enter the main details of your project.</p>
              </div>
            </div>

            <div className="form-grid">
              {/* TITLE */}

              <div className="form-group">
                <label>Project Title *</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. E-commerce Website"
                  required
                />
              </div>

              {/* SLUG */}

              <div className="form-group">
                <label>Slug *</label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e-commerce-website"
                  required
                />
              </div>

              {/* CATEGORY */}

              <div className="form-group">
                <label>Category *</label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Web Development"
                  required
                />
              </div>

              {/* CLIENT */}

              <div className="form-group">
                <label>Client</label>

                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Client or company name"
                />
              </div>
            </div>
          </div>

          {/* ========================================
              DESCRIPTION
          ======================================== */}

          <div className="form-section">
            <div className="form-section-heading">
              <span>02</span>

              <div>
                <h2>Project Description</h2>

                <p>Describe the project and its purpose.</p>
              </div>
            </div>

            {/* SHORT DESCRIPTION */}

            <div className="form-group">
              <label>Short Description *</label>

              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Write a short summary of the project..."
                rows="3"
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div className="form-group">
              <label>Full Description *</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the project in detail..."
                rows="7"
                required
              />
            </div>
          </div>

          {/* ========================================
              PROJECT DETAILS
          ======================================== */}

          <div className="form-section">
            <div className="form-section-heading">
              <span>03</span>

              <div>
                <h2>Project Details</h2>

                <p>Add project image, technology and links.</p>
              </div>
            </div>

            <div className="form-grid">
              {/* IMAGE */}

              <div className="form-group">
                <label>Project Image URL</label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/project.jpg"
                />
              </div>

              {/* LIVE URL */}

              <div className="form-group">
                <label>Live Project URL</label>

                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              {/* GITHUB */}

              <div className="form-group">
                <label>GitHub URL</label>

                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                />
              </div>

              {/* TECHNOLOGIES */}

              <div className="form-group">
                <label>Technologies</label>

                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />

                <small>Separate technologies with commas.</small>
              </div>
            </div>
          </div>

          {/* ========================================
              PUBLISH SETTINGS
          ======================================== */}

          <div className="form-section">
            <div className="form-section-heading">
              <span>04</span>

              <div>
                <h2>Publishing</h2>

                <p>Control whether this project is visible publicly.</p>
              </div>
            </div>

            <label className="publish-toggle">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />

              <span>Publish this portfolio project</span>
            </label>
          </div>

          {/* ========================================
              FORM FOOTER
          ======================================== */}

          <div className="portfolio-form-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/portfolio")}
            >
              Cancel
            </button>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : isEditMode
                  ? "Update Portfolio"
                  : "Create Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPortfolioForm;
