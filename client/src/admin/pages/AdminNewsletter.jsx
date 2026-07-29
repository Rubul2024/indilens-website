import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminNewsletter.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminNewsletter = () => {
  const navigate = useNavigate();

  // ========================================
  // SUBSCRIBERS STATE
  // ========================================

  const [subscribers, setSubscribers] = useState([]);

  // ========================================
  // LOADING STATE
  // ========================================

  const [loading, setLoading] = useState(true);

  // ========================================
  // ERROR STATE
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // FETCH NEWSLETTER SUBSCRIBERS
  // ========================================

  const fetchSubscribers = async () => {
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

      const response = await fetch(`${API_URL}/api/newsletter`, {
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
        throw new Error(
          data.message || "Unable to load newsletter subscribers.",
        );
      }

      // ========================================
      // SAVE SUBSCRIBERS
      // ========================================

      setSubscribers(data.data || []);
    } catch (error) {
      console.error("Newsletter Subscribers Error:", error);

      setError(error.message || "Unable to load newsletter subscribers.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD SUBSCRIBERS WHEN PAGE OPENS
  // ========================================

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // ========================================
  // DELETE SUBSCRIBER
  // ========================================

  const handleDelete = async (id) => {
    // ========================================
    // CONFIRM DELETE
    // ========================================

    const confirmed = window.confirm(
      "Are you sure you want to remove this subscriber?",
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

      const response = await fetch(`${API_URL}/api/newsletter/${id}`, {
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
        throw new Error(data.message || "Unable to delete subscriber.");
      }

      // ========================================
      // REMOVE FROM UI
      // ========================================

      setSubscribers((previousSubscribers) =>
        previousSubscribers.filter((subscriber) => subscriber._id !== id),
      );
    } catch (error) {
      console.error("Delete Subscriber Error:", error);

      setError(error.message || "Unable to delete subscriber.");
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
  // RENDER
  // ========================================

  return (
    <div className="admin-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <header className="admin-page-header">
        <div>
          <span className="admin-page-label">AUDIENCE</span>

          <h1>Newsletter Subscribers</h1>

          <p>View and manage people subscribed to your Indilens newsletter.</p>
        </div>

        <button
          className="admin-back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      {/* ========================================
          ERROR MESSAGE
      ======================================== */}

      {error && <div className="admin-error">{error}</div>}

      {/* ========================================
          SUBSCRIBERS CARD
      ======================================== */}

      <section className="admin-page-card">
        {/* ========================================
            CARD HEADER
        ======================================== */}

        <div className="admin-card-header">
          <div>
            <span className="admin-card-label">NEWSLETTER AUDIENCE</span>

            <h2>All Subscribers</h2>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={fetchSubscribers}
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

            <p>Loading newsletter subscribers...</p>
          </div>
        )}

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {!loading && !error && subscribers.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty-icon">◉</div>

            <h3>No Subscribers Yet</h3>

            <p>New newsletter subscribers will appear here.</p>
          </div>
        )}

        {/* ========================================
            SUBSCRIBERS TABLE
        ======================================== */}

        {!loading && subscribers.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>S.No.</th>

                  <th>Email Address</th>

                  <th>Subscription Date</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr key={subscriber._id}>
                    {/* SERIAL NUMBER */}

                    <td>{index + 1}</td>

                    {/* EMAIL */}

                    <td>
                      <a
                        href={`mailto:${subscriber.email}`}
                        className="admin-email-link"
                      >
                        {subscriber.email}
                      </a>
                    </td>

                    {/* DATE */}

                    <td>{formatDate(subscriber.createdAt)}</td>

                    {/* ACTION */}

                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(subscriber._id)}
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

export default AdminNewsletter;
