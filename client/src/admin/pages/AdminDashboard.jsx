import { useEffect, useState } from "react";
import { getAdminProfile } from "../../api/adminApi";

import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

// ========================================
// DASHBOARD STATISTICS
// ========================================

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    contacts: 0,
    subscribers: 0,
    blogs: 0,
    services: 0,
    portfolio: 0,
    faqs: 0,
    team: 0,
  });

  // ========================================
  // ADMIN PROFILE
  // ========================================

  const [admin, setAdmin] = useState(null);

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(true);

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // ADMIN PROFILE
  // ========================================

  useEffect(() => {
    const loadAdminProfile = async () => {
      try {
        const data = await getAdminProfile();

        setAdmin(data.data);
      } catch (error) {
        console.error("Admin Profile Error:", error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAdminProfile();
  }, []);

  // ========================================
  // GET DASHBOARD DATA
  // ========================================

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // ========================================
        // GET JWT TOKEN
        // ========================================

        const token = localStorage.getItem("adminToken");

        if (!token) {
          navigate("/admin/login");
          return;
        }

        // ========================================
        // SEND API REQUEST
        // ========================================

        const response = await fetch(`${API_URL}/api/admin/dashboard`, {
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
          throw new Error(data.message || "Unable to load dashboard.");
        }

        // ========================================
        // SAVE DATA
        // ========================================

        setStats({
  contacts: data.summary.totalContacts,
  subscribers: data.summary.totalNewsletterSubscribers,
  blogs: data.summary.totalBlogs,
  services: data.summary.totalServices,
  portfolio: data.summary.totalPortfolioProjects,
  faqs: data.summary.totalFAQs,
  team: data.summary.totalTeamMembers,
});

      } catch (error) {
        console.error("Dashboard Error:", error);

        setError(error.message);
        
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  // ========================================
  // GET ADMIN DATA
  // ========================================

  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminData");

    navigate("/admin/login");
  };

  // ========================================
  // NAVIGATION
  // ========================================

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      {/* ========================================
          SIDEBAR
      ======================================== */}

      <aside className="admin-sidebar">
        {/* LOGO */}

        <div className="admin-logo">
          <div className="admin-logo-mark">I</div>

          <div className="admin-logo-text">
            <strong>INDILENS</strong>

            <span>ADMIN PANEL</span>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="admin-navigation">
          <button
            className="admin-nav-item active"
            onClick={() => handleNavigation("/admin/dashboard")}
          >
            <span className="nav-icon">⌂</span>

            <span>Dashboard</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin/contacts")}
          >
            <span className="nav-icon">✉</span>

            <span>Contact Inquiries</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin/newsletter")}
          >
            <span className="nav-icon">◉</span>

            <span>Newsletter</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin/blogs")}
          >
            <span className="nav-icon">◫</span>

            <span>Blogs</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin/services")}
          >
            <span className="nav-icon">◈</span>

            <span>Services</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin/portfolio")}
          >
            <span className="nav-icon">▦</span>

            <span>Portfolio</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin/faq")}
          >
            <span className="nav-icon">?</span>

            <span>FAQ</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => handleNavigation("/admin/team")}
          >
            <span className="nav-icon">◎</span>

            <span>Team</span>
          </button>
        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ========================================
          MAIN AREA
      ======================================== */}

      <div className="admin-main">
        {/* ========================================
            TOP HEADER
        ======================================== */}

        <header className="admin-header">
          <div className="admin-header-left">
            <button className="mobile-menu-btn">☰</button>

            <div>
              <h1>Dashboard</h1>

              <p>Manage your Indilens website from one place.</p>
            </div>
          </div>

          {/* ADMIN PROFILE */}

          <div className="admin-profile">
            <div className="admin-avatar">
              {adminData?.name ? adminData.name.charAt(0).toUpperCase() : "A"}
            </div>

            <div className="admin-profile-info">
              <strong>{adminData?.name || "Admin"}</strong>

              <span>{adminData?.role || "Administrator"}</span>
            </div>
          </div>
        </header>

        {/* ========================================
            DASHBOARD CONTENT
        ======================================== */}

        <main className="admin-content">
          {/* WELCOME */}

          <section className="dashboard-welcome">
            <div>
              <span className="welcome-label">ADMIN PANEL</span>

              <h1>Welcome, {admin?.name || "Admin"}</h1>

              <p>Here's an overview of your Indilens website.</p>
            </div>
          </section>

          {/* ========================================
              STATISTICS CARDS
          ======================================== */}

          <section className="dashboard-stats">
            {error && <div className="dashboard-error">{error}</div>}

            {/* CONTACTS */}

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">✉</div>

                <span className="stat-label">CONTACTS</span>
              </div>

              <h3>{loading ? "..." : stats.contacts}</h3>

              <p>Total inquiries</p>
            </div>

            {/* NEWSLETTER */}

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">◉</div>

                <span className="stat-label">SUBSCRIBERS</span>
              </div>

              <h3>{loading ? "..." : stats.subscribers}</h3>

              <p>Newsletter subscribers</p>
            </div>

            {/* BLOGS */}

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">◫</div>

                <span className="stat-label">BLOGS</span>
              </div>

              <h3>{loading ? "..." : stats.blogs}</h3>

              <p>Published articles</p>
            </div>

            {/* SERVICES */}

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">◈</div>

                <span className="stat-label">SERVICES</span>
              </div>

              <h3>{loading ? "..." : stats.services}</h3>

              <p>Active services</p>
            </div>
          </section>

          {/* ========================================
              QUICK ACTIONS
          ======================================== */}

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <span>MANAGEMENT</span>

                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions">
              <button onClick={() => handleNavigation("/admin/blogs")}>
                <span>◫</span>

                <div>
                  <strong>Manage Blogs</strong>

                  <small>Create and edit articles</small>
                </div>

                <b>→</b>
              </button>

              <button onClick={() => handleNavigation("/admin/contacts")}>
                <span>✉</span>

                <div>
                  <strong>View Inquiries</strong>

                  <small>Check customer messages</small>
                </div>

                <b>→</b>
              </button>

              <button onClick={() => handleNavigation("/admin/services")}>
                <span>◈</span>

                <div>
                  <strong>Manage Services</strong>

                  <small>Update your services</small>
                </div>

                <b>→</b>
              </button>
            </div>
          </section>

          {/* ========================================
              RECENT ACTIVITY
          ======================================== */}

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <span>ACTIVITY</span>

                <h2>Recent Contact Inquiries</h2>
              </div>

              <button
                className="view-all-btn"
                onClick={() => handleNavigation("/admin/contacts")}
              >
                View All →
              </button>
            </div>

            <div className="empty-state">
              <div className="empty-icon">✉</div>

              <h3>No inquiries yet</h3>

              <p>New contact form submissions will appear here.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
