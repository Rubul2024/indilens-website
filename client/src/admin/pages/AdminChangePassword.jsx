import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updatePassword } from "../../api/adminApi";

import "./AdminChangePassword.css";

const AdminChangePassword = () => {
  const navigate = useNavigate();

  // ========================================
  // FORM STATE
  // ========================================

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(false);

  // ========================================
  // SUCCESS MESSAGE
  // ========================================

  const [success, setSuccess] = useState("");

  // ========================================
  // ERROR MESSAGE
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // PASSWORD VISIBILITY
  // ========================================

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // ========================================
  // PASSWORD STRENGTH
  // ========================================

  const getPasswordStrength = (password) => {
    if (!password) {
      return {
        text: "",
        className: "",
      };
    }

    if (password.length < 6) {
      return {
        text: "Weak",
        className: "weak",
      };
    }

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (strongRegex.test(password)) {
      return {
        text: "Strong",
        className: "strong",
      };
    }

    return {
      text: "Medium",
      className: "medium",
    };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  // ========================================
  // AUTO REDIRECT AFTER SUCCESS
  // ========================================

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      navigate("/admin/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, navigate]);

  // ========================================
  // SUBMIT FORM
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    // ========================================
    // VALIDATION
    // ========================================

    if (formData.currentPassword === formData.newPassword) {
      return setError(
        "New password must be different from the current password.",
      );
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return setError("New Password and Confirm Password do not match.");
    }

    if (formData.newPassword.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      const response = await updatePassword(formData);

      setSuccess(response.message || "Password Updated Successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="admin-page-header">
        <div>
          <span className="admin-eyebrow">SETTINGS</span>

          <h1>Change Password</h1>

          <p>Update your administrator password securely.</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* ========================================
          FORM CARD
      ======================================== */}

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          {/* CURRENT PASSWORD */}

          <div className="form-group">
            <label>Current Password</label>

            <div className="password-input">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}

          <div className="form-group">
            <label>New Password</label>

            <div className="password-input">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "🙈" : "👁"}
              </button>
            </div>

            {formData.newPassword && (
              <small
                className={`password-strength ${passwordStrength.className}`}
              >
                Password Strength : {passwordStrength.text}
              </small>
            )}
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-group">
            <label>Confirm Password</label>

            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* SUCCESS */}

          {success && (
            <div className="success-box">
              ✅ {success}
              <br />
              Redirecting to Dashboard...
            </div>
          )}

          {/* ERROR */}

          {error && <div className="error-box">{error}</div>}

          {/* SUBMIT BUTTON */}

          <button className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
