import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getFAQById } from "../../api/faqApi";

import "./AdminFAQView.css";

const AdminFAQView = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [faq, setFaq] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ========================================
  // LOAD FAQ
  // ========================================

  useEffect(() => {
    const loadFAQ = async () => {
      try {
        setLoading(true);

        const response = await getFAQById(id);

        setFaq(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFAQ();
  }, [id]);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin-loading">
        Loading FAQ...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        {error}
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}

      <div className="admin-page-header">

        <div>

          <span className="admin-eyebrow">
            FAQ MANAGEMENT
          </span>

          <h1>View FAQ</h1>

          <p>
            View complete FAQ information.
          </p>

        </div>

        <div className="admin-header-actions">

          <button
            className="dashboard-btn"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className="dashboard-btn"
            onClick={() =>
              navigate("/admin/faq")
            }
          >
            ← Back
          </button>

          <button
            className="create-btn"
            onClick={() =>
              navigate(`/admin/faq/edit/${faq._id}`)
            }
          >
            Edit FAQ
          </button>

        </div>

      </div>

      {/* ======================================== */}
      {/* CARD */}
      {/* ======================================== */}

      <div className="admin-view-card">

        <div className="view-group">

          <label>Question</label>

          <p>{faq.question}</p>

        </div>

        <div className="view-group">

          <label>Answer</label>

          <p>{faq.answer}</p>

        </div>

        <div className="view-group">

          <label>Category</label>

          <p>{faq.category || "General"}</p>

        </div>

        <div className="view-group">

          <label>Display Order</label>

          <p>{faq.order}</p>

        </div>

        <div className="view-group">

          <label>Status</label>

          <span
            className={
              faq.isPublished
                ? "status published"
                : "status draft"
            }
          >
            {faq.isPublished
              ? "Published"
              : "Draft"}
          </span>

        </div>

        <div className="view-group">

          <label>Created</label>

          <p>{formatDate(faq.createdAt)}</p>

        </div>

        <div className="view-group">

          <label>Last Updated</label>

          <p>{formatDate(faq.updatedAt)}</p>

        </div>

      </div>

    </div>
  );
};

export default AdminFAQView;