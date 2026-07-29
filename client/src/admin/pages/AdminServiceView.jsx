import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AdminServiceView.css";

const AdminServiceView = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [service, setService] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);

        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `http://localhost:5000/api/services/${id}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load service.");
        }

        setService(data.data);
      } catch (error) {
        console.error("Service View Error:", error);

        setError(error.message || "Unable to load service.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="admin-service-view-page">
        <div className="service-view-container">
          <p>Loading service...</p>
        </div>
      </main>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <main className="admin-service-view-page">
        <div className="service-view-container">
          <div className="service-view-error">{error}</div>

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/admin/services")}
          >
            ← Back to Services
          </button>
        </div>
      </main>
    );
  }

  // ========================================
  // SERVICE NOT FOUND
  // ========================================

  if (!service) {
    return (
      <main className="admin-service-view-page">
        <div className="service-view-container">
          <h2>Service not found</h2>

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/admin/services")}
          >
            ← Back to Services
          </button>
        </div>
      </main>
    );
  }

  // ========================================
  // SERVICE DETAILS
  // ========================================

  return (
    <main className="admin-service-view-page">
      <div className="service-view-container">
        {/* HEADER */}

        <div className="service-view-header">
          <div>
            <span className="service-view-label">SERVICE DETAILS</span>

            <h1>{service.title}</h1>

            <p>View complete information about this service.</p>
          </div>

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/admin/services")}
          >
            ← Back to Services
          </button>
        </div>

        {/* SERVICE CARD */}

        <div className="service-details-card">
          {/* ICON */}

          <div className="service-details-icon">{service.icon || "◈"}</div>

          {/* TITLE */}

          <div className="service-details-section">
            <span>SERVICE TITLE</span>

            <h2>{service.title}</h2>
          </div>

          {/* SLUG */}

          <div className="service-details-section">
            <span>SLUG</span>

            <p>{service.slug || "—"}</p>
          </div>

          {/* CATEGORY */}

          <div className="service-details-section">
            <span>CATEGORY</span>

            <p>{service.category || "—"}</p>
          </div>

          {/* EXCERPT */}

          <div className="service-details-section">
            <span>SHORT DESCRIPTION</span>

            <p>{service.excerpt || "—"}</p>
          </div>

          {/* DESCRIPTION */}

          <div className="service-details-section">
            <span>DESCRIPTION</span>

            <p>{service.description || "—"}</p>
          </div>

          {/* STATUS */}

          <div className="service-details-section">
            <span>STATUS</span>

            <p>{service.isPublished ? "Published" : "Draft"}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminServiceView;
