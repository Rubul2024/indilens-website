import { useNavigate } from "react-router-dom";

const AdminFAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-label">SUPPORT</span>

          <h1>FAQ</h1>

          <p>
            Create and manage frequently asked questions.
          </p>
        </div>

        <button
          className="admin-back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      <section className="admin-page-card">
        <h2>FAQ Management</h2>

        <p>
          Your frequently asked questions will appear here.
        </p>
      </section>
    </div>
  );
};

export default AdminFAQ;