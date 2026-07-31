import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { createFAQ, getFAQById, updateFAQ } from "../../api/faqApi";

import "./AdminFAQForm.css";

const AdminFAQForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  // ========================================
  // FORM DATA
  // ========================================

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    order: 0,
    isPublished: true,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ========================================
  // LOAD FAQ
  // ========================================

  useEffect(() => {
    if (!isEdit) return;

    const loadFAQ = async () => {
      try {
        setLoading(true);

        const response = await getFAQById(id);

        setFormData({
          question: response.data.question || "",
          answer: response.data.answer || "",
          category: response.data.category || "",
          order: response.data.order || 0,
          isPublished: response.data.isPublished ?? true,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFAQ();
  }, [id, isEdit]);

  // ========================================
  // CHANGE
  // ========================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await updateFAQ(id, formData);

        alert("FAQ updated successfully.");
      } else {
        await createFAQ(formData);

        alert("FAQ created successfully.");
      }

      navigate("/admin/faq");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-page">
      {/* HEADER */}

      <div className="admin-page-header">
        <div>
          <span className="admin-eyebrow">FAQ MANAGEMENT</span>

          <h1>{isEdit ? "Edit FAQ" : "Create FAQ"}</h1>

          <p>Manage Frequently Asked Questions.</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/admin/faq")}
        >
          ← Back
        </button>
      </div>

      {/* ERROR */}

      {error && <div className="admin-error">{error}</div>}

      {/* FORM */}

      <form className="admin-form-card" onSubmit={handleSubmit}>
        {/* QUESTION */}

        <div className="form-group">
          <label>Question</label>

          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </div>

        {/* ANSWER */}

        <div className="form-group">
          <label>Answer</label>

          <textarea
            name="answer"
            rows="6"
            value={formData.answer}
            onChange={handleChange}
            required
          />
        </div>

        {/* CATEGORY */}

        <div className="form-group">
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        {/* DISPLAY ORDER */}

        <div className="form-group">
          <label>Display Order</label>

          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
          />
        </div>

        {/* PUBLISH */}

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="published"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />

          <label htmlFor="published">Published</label>
        </div>

        {/* BUTTONS */}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/faq")}
          >
            Cancel
          </button>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update FAQ" : "Create FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminFAQForm;
