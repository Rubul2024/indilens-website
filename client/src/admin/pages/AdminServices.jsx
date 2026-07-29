import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminServices.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminServices = () => {
  const navigate = useNavigate();

  // ========================================
  // SERVICES
  // ========================================

  const [services, setServices] = useState([]);

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(true);

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // DELETE LOADING
  // ========================================

  const [deletingId, setDeletingId] = useState(null);

  // ========================================
  // FETCH SERVICES
  // ========================================

  const fetchServices = async () => {
    try {
      setLoading(true);

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
      // API REQUEST
      // ========================================

      const response = await fetch(`${API_URL}/api/services`, {
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
        throw new Error(data.message || "Unable to load services.");
      }

      // ========================================
      // SAVE SERVICES
      // ========================================

      setServices(data.data || []);
    } catch (error) {
      console.error("Services Error:", error);

      setError(error.message || "Unable to load services.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD SERVICES
  // ========================================

  useEffect(() => {
    fetchServices();
  }, []);

  // ========================================
  // DELETE SERVICE
  // ========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      setError("");

      // ========================================
      // GET TOKEN
      // ========================================

      const token = localStorage.getItem("adminToken");

      // ========================================
      // DELETE REQUEST
      // ========================================

      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: "DELETE",

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
        throw new Error(data.message || "Unable to delete service.");
      }

      // ========================================
      // REMOVE FROM UI
      // ========================================

      setServices((previousServices) =>
        previousServices.filter((service) => service._id !== id),
      );
    } catch (error) {
      console.error("Delete Service Error:", error);

      setError(error.message || "Unable to delete service.");
    } finally {
      setDeletingId(null);
    }
  };

  // ========================================
  // LOADING STATE
  // ========================================

  if (loading) {
    return (
      <div className="admin-services-page">
        <div className="admin-services-loading">Loading services...</div>
      </div>
    );
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="admin-services-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <header className="admin-services-header">
        <div>
          <span className="admin-services-label">CONTENT MANAGEMENT</span>

          <h1>Services</h1>

          <p>Manage the services displayed on your Indilens website.</p>
        </div>

       <div className="admin-page-actions">

  <button
    className="dashboard-btn"
    onClick={() => navigate("/admin/dashboard")}
  >
    ← Dashboard
  </button>

  <button
    className="create-service-btn"
    onClick={() =>
      navigate("/admin/services/create")
    }
  >
    + Create Service
  </button>

</div>
      </header>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && <div className="admin-services-error">{error}</div>}

      {/* ========================================
          SERVICES TABLE
      ======================================== */}

      <section className="admin-services-card">
        <div className="admin-services-card-header">
          <div>
            <span>SERVICE MANAGEMENT</span>

            <h2>All Services</h2>
          </div>

          <strong>{services.length} Services</strong>
        </div>

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {services.length === 0 ? (
          <div className="admin-services-empty">
            <div className="admin-empty-icon">◈</div>

            <h3>No Services Found</h3>

            <p>Create your first service to get started.</p>

            <button onClick={() => navigate("/admin/services/create")}>
              Create Service
            </button>
          </div>
        ) : (
          <div className="admin-services-table-wrapper">
            <table className="admin-services-table">
              <thead>
                <tr>
                  <th>S.No.</th>

                  <th>Service</th>

                  <th>Category</th>

                  <th>Status</th>

                  <th>Date</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service, index) => (
                  <tr key={service._id}>
                    {/* SERIAL NUMBER */}

                    <td>
                      <span className="service-serial">{index + 1}</span>
                    </td>

                    {/* SERVICE */}

                    <td>
                      <div className="service-title">
                        <strong>{service.title || "Untitled Service"}</strong>

                        <small>{service.slug || "No slug"}</small>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td>{service.category || "—"}</td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={
                          service.isPublished
                            ? "service-status published"
                            : "service-status draft"
                        }
                      >
                        {service.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* DATE */}

                    <td>
                      {service.createdAt
                        ? new Date(service.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="service-actions">
                        {/* VIEW */}

                        <button
                          className="service-view-btn"
                          onClick={() =>
                            navigate(`/admin/services/view/${service._id}`)
                          }
                        >
                          View
                        </button>

                        {/* EDIT */}

                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(`/admin/services/${service._id}/edit`)
                          }
                        >
                          Edit
                        </button>

                        {/* DELETE */}

                        <button
                          className="service-delete-btn"
                          onClick={() => handleDelete(service._id)}
                          disabled={deletingId === service._id}
                        >
                          {deletingId === service._id
                            ? "Deleting..."
                            : "Delete"}
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

export default AdminServices;
