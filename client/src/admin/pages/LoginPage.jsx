import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { status, signIn, notice, clearNotice } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Sign in | Indilens Admin";
  }, []);

  if (status === "authenticated") {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    clearNotice();

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in.");
      setPassword("");
    } finally {
      setSubmitting(false);
    }
  };

  const message = error || notice;

  return (
    <div className="adm-login">
      <section className="adm-login-brand" aria-hidden="true">
        <div className="adm-login-brand-inner">
          <div className="adm-login-logo">
            <img src="/images/indilens-logo.png" alt="" />
          </div>
          <h2>Indilens Admin</h2>
          <p>Manage your website content, enquiries and subscribers from one secure workspace.</p>

          <ul className="adm-login-points">
            <li>
              <Icon name="mail" /> Respond to client enquiries
            </li>
            <li>
              <Icon name="blog" /> Publish blog posts &amp; projects
            </li>
            <li>
              <Icon name="lock" /> Protected, session-based access
            </li>
          </ul>
        </div>
      </section>

      <section className="adm-login-panel">
        <form className="adm-login-card" onSubmit={handleSubmit} noValidate>
          <img className="adm-login-mobile-logo" src="/images/indilens-logo.png" alt="Indilens" />

          <span className="adm-eyebrow">Admin Portal</span>
          <h1>Welcome back</h1>
          <p className="adm-muted">Sign in to access your Indilens dashboard.</p>

          {message && (
            <div className="adm-alert adm-alert--error" role="alert">
              <Icon name="alert" size={16} />
              <span>{message}</span>
            </div>
          )}

          <label className="adm-field">
            <span className="adm-label">Email address</span>
            <input
              className="adm-input"
              type="email"
              autoComplete="username"
              placeholder="admin@indilens.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
              autoFocus
              required
            />
          </label>

          <label className="adm-field">
            <span className="adm-label">Password</span>
            <span className="adm-input-group">
              <input
                className="adm-input"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={submitting}
                required
              />
              <button
                type="button"
                className="adm-input-addon"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon name={showPassword ? "eyeOff" : "eye"} />
              </button>
            </span>
          </label>

          <button type="submit" className="adm-btn adm-btn--primary adm-btn--block adm-btn--lg" disabled={submitting}>
            {submitting ? (
              <>
                <span className="adm-spinner adm-spinner--sm" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <a className="adm-login-back" href="/">
            <Icon name="arrowLeft" size={16} /> Back to website
          </a>

          <p className="adm-login-foot">© {new Date().getFullYear()} Indilens Web Solutions</p>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
