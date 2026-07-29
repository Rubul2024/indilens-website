import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminContacts.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminContacts = () => {
  const navigate = useNavigate();

  // ========================================
  // CONTACTS STATE
  // ========================================

  const [contacts, setContacts] = useState([]);

  // ========================================
  // LOADING STATE
  // ========================================

  const [loading, setLoading] = useState(true);

  // ========================================
  // ERROR STATE
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // FETCH CONTACTS
  // ========================================

  const fetchContacts = async () => {
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

      const response = await fetch(`${API_URL}/api/contact`, {
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
        throw new Error(data.message || "Unable to load contact inquiries.");
      }

      // ========================================
      // SAVE CONTACTS
      // ========================================

      setContacts(data.data || []);
    } catch (error) {
      console.error("Contact Inquiries Error:", error);

      setError(error.message || "Unable to load contact inquiries.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD CONTACTS ON PAGE LOAD
  // ========================================

  useEffect(() => {
    fetchContacts();
  }, []);

  // ========================================
  // DELETE CONTACT
  // ========================================

  const handleDelete = async (id) => {
    // ========================================
    // CONFIRM DELETE
    // ========================================

    const confirmed = window.confirm(
      "Are you sure you want to delete this contact inquiry?",
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

      const response = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "DELETE",

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
        throw new Error(data.message || "Unable to delete contact.");
      }

      // ========================================
      // REMOVE DELETED CONTACT FROM UI
      // ========================================

      setContacts((previousContacts) =>
        previousContacts.filter((contact) => contact._id !== id),
      );
    } catch (error) {
      console.error("Delete Contact Error:", error);

      setError(error.message || "Unable to delete contact.");
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
          <span className="admin-page-label">INQUIRIES</span>

          <h1>Contact Inquiries</h1>

          <p>View and manage messages submitted through your contact form.</p>
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
          CONTACT TABLE CARD
      ======================================== */}

      <section className="admin-page-card">
        {/* ========================================
            CARD HEADER
        ======================================== */}

        <div className="admin-card-header">
          <div>
            <span className="admin-card-label">CUSTOMER MESSAGES</span>

            <h2>All Contact Inquiries</h2>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={fetchContacts}
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

            <p>Loading contact inquiries...</p>
          </div>
        )}

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {!loading && !error && contacts.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty-icon">✉</div>

            <h3>No Contact Inquiries</h3>

            <p>New contact form submissions will appear here.</p>
          </div>
        )}

        {/* ========================================
            CONTACT TABLE
        ======================================== */}

        {!loading && contacts.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>S.No</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Subject</th>

                  <th>Date</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((contact, index) => (

                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{contact.name}</strong>
                    </td>

                    <td>
                      <a
                        href={`mailto:${contact.email}`}
                        className="admin-email-link"
                      >
                        {contact.email}
                      </a>
                    </td>

                    <td>{contact.phone || "—"}</td>

                    <td>{contact.subject || "—"}</td>

                    <td>{formatDate(contact.createdAt)}</td>

                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-view-btn"
                          onClick={() =>
                            window.alert(
                              contact.message || "No message available.",
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(contact._id)}
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

export default AdminContacts;
