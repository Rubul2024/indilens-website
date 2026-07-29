import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAdminPortfolios,
  deletePortfolio,
} from "../../api/portfolioApi";

import "./AdminPortfolio.css";

const AdminPortfolio = () => {
  const navigate = useNavigate();

  // ========================================
  // PORTFOLIO DATA
  // ========================================

  const [portfolios, setPortfolios] = useState([]);

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(true);

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // FETCH PORTFOLIO PROJECTS
  // ========================================

  const fetchPortfolios = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getAdminPortfolios();

      setPortfolios(data.data || []);
    } catch (error) {
      console.error("Portfolio Error:", error);

      setError(
        error.message || "Unable to load portfolio projects."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD PORTFOLIO DATA
  // ========================================

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // ========================================
  // DELETE PORTFOLIO
  // ========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this portfolio project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deletePortfolio(id);

      // Remove deleted project from UI
      setPortfolios((previousPortfolios) =>
        previousPortfolios.filter(
          (portfolio) => portfolio._id !== id
        )
      );

      alert(
        "Portfolio project deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete Portfolio Error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete portfolio project."
      );
    }
  };

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString();
  };

  // ========================================
  // VIEW PORTFOLIO
  // ========================================

  const handleView = (id) => {
    navigate(`/admin/portfolio/view/${id}`);
  };

  // ========================================
  // EDIT PORTFOLIO
  // ========================================

  const handleEdit = (id) => {
    navigate(`/admin/portfolio/edit/${id}`);
  };

  // ========================================
  // CREATE PORTFOLIO
  // ========================================

  const handleCreate = () => {
    navigate("/admin/portfolio/create");
  };

  // ========================================
  // RETURN
  // ========================================

  return (
    <div className="admin-page">

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="admin-page-header">

        <div>

          <span className="admin-eyebrow">
            CONTENT MANAGEMENT
          </span>

          <h1>Portfolio</h1>

          <p>
            Manage the projects displayed on your
            Indilens website.
          </p>

        </div>

        <div className="admin-header-actions">

          {/* DASHBOARD BUTTON */}

          <button
            className="dashboard-btn"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            ← Dashboard
          </button>

          {/* CREATE PORTFOLIO BUTTON */}

          <button
            className="create-btn"
            onClick={handleCreate}
          >
            + Create Portfolio
          </button>

        </div>

      </div>


      {/* ========================================
          ERROR MESSAGE
      ======================================== */}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}


      {/* ========================================
          PORTFOLIO TABLE CARD
      ======================================== */}

      <div className="admin-table-card">

        {/* TABLE HEADER */}

        <div className="table-header">

          <div>

            <span className="admin-eyebrow">
              PORTFOLIO MANAGEMENT
            </span>

            <h2>
              All Projects
            </h2>

          </div>

          <span>
            {portfolios.length}{" "}
            {portfolios.length === 1
              ? "Project"
              : "Projects"}
          </span>

        </div>


        {/* ========================================
            LOADING STATE
        ======================================== */}

        {loading ? (

          <div className="admin-loading">
            Loading portfolio projects...
          </div>

        ) : portfolios.length === 0 ? (

          /* ========================================
              EMPTY STATE
          ======================================== */

          <div className="admin-empty">

            <h3>
              No portfolio projects found.
            </h3>

            <p>
              Create your first portfolio project
              to get started.
            </p>

            <button
              className="create-btn"
              onClick={handleCreate}
            >
              + Create Portfolio
            </button>

          </div>

        ) : (

          /* ========================================
              PORTFOLIO TABLE
          ======================================== */

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>S.NO.</th>

                  <th>PROJECT</th>

                  <th>CATEGORY</th>

                  <th>STATUS</th>

                  <th>DATE</th>

                  <th>ACTION</th>

                </tr>

              </thead>


              <tbody>

                {portfolios.map(
                  (portfolio, index) => (

                    <tr
                      key={portfolio._id}
                    >

                      {/* SERIAL NUMBER */}

                      <td>

                        <span className="serial-number">
                          {index + 1}
                        </span>

                      </td>


                      {/* PROJECT */}

                      <td>

                        <div className="project-info">

                          <strong>
                            {portfolio.title}
                          </strong>

                          <small>
                            {portfolio.slug}
                          </small>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td>
                        {portfolio.category || "—"}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            portfolio.isPublished
                              ? "status published"
                              : "status draft"
                          }
                        >

                          {portfolio.isPublished
                            ? "Published"
                            : "Draft"}

                        </span>

                      </td>


                      {/* DATE */}

                      <td>
                        {formatDate(
                          portfolio.createdAt
                        )}
                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="action-buttons">

                          {/* VIEW */}

                          <button
                            className="view-btn"
                            onClick={() =>
                              handleView(
                                portfolio._id
                              )
                            }
                          >
                            View
                          </button>


                          {/* EDIT */}

                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(
                                portfolio._id
                              )
                            }
                          >
                            Edit
                          </button>


                          {/* DELETE */}

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                portfolio._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminPortfolio;