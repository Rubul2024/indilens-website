import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  // ========================================
  // FORM STATE
  // ========================================

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ========================================
  // LOADING STATE
  // ========================================

  const [loading, setLoading] = useState(false);

  // ========================================
  // ERROR STATE
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // LOGIN FUNCTION
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      console.log("API URL:", apiUrl);

      const loginUrl = `${apiUrl}/api/admin/login`;

      console.log("LOGIN URL:", loginUrl);

      const response = await fetch(loginUrl, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful");

      // Save JWT token
      localStorage.setItem("adminToken", data.token);

      // Save admin information
      localStorage.setItem("admin", JSON.stringify(data.admin));

      // Redirect to dashboard
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Admin Login Error:", error);

      setError(error.message || "Unable to login");
    }
  };

  return (
    <main className="admin-login-page">
      {/* ========================================
          LEFT SIDE
      ======================================== */}

      <section className="admin-login-brand">
        <div className="admin-brand-content">
          <div className="admin-brand-logo">I</div>

          <h1>INDILENS</h1>

          <p>Admin Management Portal</p>

          <span>Manage your digital business from one secure workspace.</span>
        </div>
      </section>

      {/* ========================================
          RIGHT SIDE
      ======================================== */}

      <section className="admin-login-section">
        <div className="admin-login-card">
          {/* ========================================
              HEADER
          ======================================== */}

          <div className="admin-login-header">
            <span className="admin-login-label">ADMIN PORTAL</span>

            <h2>Welcome Back</h2>

            <p>Sign in to access your Indilens dashboard.</p>
          </div>

          {/* ========================================
              ERROR
          ======================================== */}

          {error && <div className="admin-login-error">{error}</div>}

          {/* ========================================
              LOGIN FORM
          ======================================== */}

          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* EMAIL */}

            <div className="admin-form-group">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@indilens.com"
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="admin-form-group">
              <label>Password</label>

              <div className="admin-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="admin-login-button"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* ========================================
              FOOTER
          ======================================== */}

          <div className="admin-login-footer">
            <span>© {new Date().getFullYear()} Indilens Web Solutions</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
