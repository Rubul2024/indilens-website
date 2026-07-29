import { useNavigate } from "react-router-dom";

const AdminTeam = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-label">PEOPLE</span>

          <h1>Team</h1>

          <p>
            Manage your Indilens team members.
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
        <h2>Team Management</h2>

        <p>
          Your team members will appear here.
        </p>
      </section>
    </div>
  );
};

export default AdminTeam;