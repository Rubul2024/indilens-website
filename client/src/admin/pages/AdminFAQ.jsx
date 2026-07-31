import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAdminFAQs, deleteFAQ } from "../../api/faqApi";

import "./AdminFAQ.css";

const AdminFAQ = () => {
  const navigate = useNavigate();

  // ========================================
  // STATE
  // ========================================

  const [faqs, setFaqs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ========================================
  // FETCH FAQS
  // ========================================

  const fetchFAQs = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getAdminFAQs();

      setFaqs(data.data || []);
    } catch (error) {
      console.error(error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  // ========================================
  // DELETE FAQ
  // ========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this FAQ?");

    if (!confirmDelete) return;

    try {
      await deleteFAQ(id);

      setFaqs((previousFAQs) => previousFAQs.filter((faq) => faq._id !== id));

      alert("FAQ deleted successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString();
  };

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="admin-page">
      {/* ======================================== */}
      {/* PAGE HEADER */}
      {/* ======================================== */}

      <div className="admin-page-header">
        <div>
          <span className="admin-eyebrow">WEBSITE CONTENT</span>

          <h1>FAQ Management</h1>

          <p>Manage Frequently Asked Questions.</p>
        </div>

        <div className="admin-header-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Dashboard
          </button>

          <button
            className="create-btn"
            onClick={() => navigate("/admin/faq/create")}
          >
            + Create FAQ
          </button>
        </div>
      </div>

      {/* ======================================== */}
      {/* ERROR */}
      {/* ======================================== */}

      {error && <div className="admin-error">{error}</div>}

      {/* ======================================== */}
      {/* TABLE */}
      {/* ======================================== */}

      <div className="admin-table-card">
        <div className="table-header">
          <div>
            <span className="admin-eyebrow">FAQ MANAGEMENT</span>

            <h2>All FAQs</h2>
          </div>

          <span>{faqs.length} FAQs</span>
        </div>

        {loading ? (
          <div className="admin-loading">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="admin-empty">
            <h3>No FAQs Found</h3>

            <p>Create your first FAQ.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>S.NO.</th>

                  <th>QUESTION</th>

                  <th>CATEGORY</th>

                  <th>STATUS</th>

                  <th>DATE</th>

                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {faqs.map((faq, index) => (
                  <tr key={faq._id}>
                    <td>
                      <span className="serial-number">{index + 1}</span>
                    </td>

                    <td>
                      <strong>{faq.question}</strong>
                    </td>

                    <td>{faq.category || "General"}</td>

                    <td>
                      <span
                        className={
                          faq.isPublished ? "status published" : "status draft"
                        }
                      >
                        {faq.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td>{formatDate(faq.createdAt)}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => navigate(`/admin/faq/view/${faq._id}`)}
                        >
                          View
                        </button>

                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/admin/faq/edit/${faq._id}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(faq._id)}
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
      </div>
    </div>
  );
};

export default AdminFAQ;
