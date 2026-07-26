import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ========================================
  // HANDLE LOGIN
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // ========================================
      // CHECK API ERROR
      // ========================================

      if (!response.ok) {
        throw new Error(
          data.message || "Admin login failed."
        );
      }

      // ========================================
      // SAVE JWT TOKEN
      // ========================================

      localStorage.setItem(
        "adminToken",
        data.token
      );

      // ========================================
      // SAVE ADMIN INFORMATION
      // ========================================

      localStorage.setItem(
        "adminData",
        JSON.stringify(data.admin)
      );

      // ========================================
      // REDIRECT TO DASHBOARD
      // ========================================

      navigate("/admin/dashboard");

    } catch (error) {
      console.error(
        "Admin Login Error:",
        error
      );

      setError(
        error.message ||
        "Unable to login."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Admin Login</h1>

      {error && (
        <p>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter admin email"
            required
          />
        </div>

        <div>
          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>
    </main>
  );
};

export default AdminLogin;