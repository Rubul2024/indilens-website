import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ========================================
  // GET ADMIN DATA
  // ========================================

  const adminData = JSON.parse(
    localStorage.getItem("adminData")
  );

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminData");

    navigate("/admin/login");
  };

  return (
    <main>
      <h1>Admin Dashboard</h1>

      <p>
        Welcome,{" "}
        {adminData?.name || "Admin"}
      </p>

      <div>
        <h2>Dashboard Overview</h2>

        <p>
          Manage your Indilens website
          from this dashboard.
        </p>
      </div>

      <div>
        <h3>Contact Inquiries</h3>

        <p>
          Manage customer messages.
        </p>
      </div>

      <div>
        <h3>Newsletter Subscribers</h3>

        <p>
          Manage newsletter subscribers.
        </p>
      </div>

      <div>
        <h3>Blog Management</h3>

        <p>
          Create, update and delete blogs.
        </p>
      </div>

      <div>
        <h3>Services Management</h3>

        <p>
          Manage your services.
        </p>
      </div>

      <div>
        <h3>Portfolio Management</h3>

        <p>
          Manage your portfolio projects.
        </p>
      </div>

      <div>
        <h3>FAQ Management</h3>

        <p>
          Manage frequently asked questions.
        </p>
      </div>

      <div>
        <h3>Team Management</h3>

        <p>
          Manage your team members.
        </p>
      </div>

      <button
        onClick={handleLogout}
      >
        Logout
      </button>
    </main>
  );
};

export default AdminDashboard;