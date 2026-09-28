import { useState } from "react";

import Icon from "../components/Icon";
import { PageHeader } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { authApi } from "../lib/api";
import { formatDate } from "../lib/format";

const PASSWORD_RULES = [
  { test: (value) => value.length >= 8, label: "At least 8 characters" },
  { test: (value) => /[A-Za-z]/.test(value), label: "Contains a letter" },
  { test: (value) => /\d/.test(value), label: "Contains a number" },
];

const PasswordInput = ({ id, label, value, onChange, autoComplete }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="adm-field">
      <label className="adm-label" htmlFor={id}>
        {label}
      </label>
      <span className="adm-input-group">
        <input
          id={id}
          className="adm-input"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          className="adm-input-addon"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <Icon name={visible ? "eyeOff" : "eye"} />
        </button>
      </span>
    </div>
  );
};

const ProfileCard = () => {
  const { admin, setAdmin } = useAuth();
  const toast = useToast();
  const [name, setName] = useState(admin?.name || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [saving, setSaving] = useState(false);

  const dirty = name.trim() !== admin?.name || email.trim().toLowerCase() !== admin?.email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const result = await authApi.updateProfile({ name: name.trim(), email: email.trim() });
      setAdmin(result.data);
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="adm-card" onSubmit={handleSubmit}>
      <h2 className="adm-card-title">
        <Icon name="user" /> Profile
      </h2>
      <p className="adm-muted adm-card-lead">Your name and the email address you sign in with.</p>

      <div className="adm-field">
        <label className="adm-label" htmlFor="profile-name">
          Name
        </label>
        <input
          id="profile-name"
          className="adm-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          maxLength={80}
          required
        />
      </div>

      <div className="adm-field">
        <label className="adm-label" htmlFor="profile-email">
          Sign-in email
        </label>
        <input
          id="profile-email"
          className="adm-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div className="adm-form-actions">
        <button type="submit" className="adm-btn adm-btn--primary" disabled={!dirty || saving || !name.trim()}>
          {saving ? "Saving…" : "Save profile"}
        </button>
      </div>
    </form>
  );
};

const PasswordCard = () => {
  const { replaceToken } = useAuth();
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const rulesPassed = PASSWORD_RULES.every((rule) => rule.test(newPassword));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!rulesPassed) {
      setError("The new password does not meet the requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const result = await authApi.changePassword({ currentPassword, newPassword });
      // Old tokens are revoked server-side; keep this session alive
      replaceToken(result.token);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed. Other sessions have been signed out.");
    } catch (changeError) {
      setError(changeError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="adm-card" onSubmit={handleSubmit}>
      <h2 className="adm-card-title">
        <Icon name="lock" /> Change password
      </h2>
      <p className="adm-muted adm-card-lead">Changing your password signs out every other active session.</p>

      {error && (
        <div className="adm-alert adm-alert--error" role="alert">
          <Icon name="alert" size={16} /> <span>{error}</span>
        </div>
      )}

      <PasswordInput
        id="current-password"
        label="Current password"
        value={currentPassword}
        onChange={setCurrentPassword}
        autoComplete="current-password"
      />
      <PasswordInput
        id="new-password"
        label="New password"
        value={newPassword}
        onChange={setNewPassword}
        autoComplete="new-password"
      />

      <ul className="adm-rules">
        {PASSWORD_RULES.map((rule) => (
          <li key={rule.label} className={rule.test(newPassword) ? "is-met" : ""}>
            <Icon name="check" size={14} /> {rule.label}
          </li>
        ))}
      </ul>

      <PasswordInput
        id="confirm-password"
        label="Confirm new password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
      />

      <div className="adm-form-actions">
        <button
          type="submit"
          className="adm-btn adm-btn--primary"
          disabled={saving || !currentPassword || !newPassword || !confirmPassword}
        >
          {saving ? "Updating…" : "Update password"}
        </button>
      </div>
    </form>
  );
};

const SettingsPage = () => {
  const { admin, signOut } = useAuth();

  return (
    <>
      <PageHeader title="Settings" description="Manage your admin account and security." />

      <div className="adm-grid-2 adm-grid-2--top">
        <ProfileCard />
        <PasswordCard />
      </div>

      <section className="adm-card">
        <h2 className="adm-card-title">
          <Icon name="settings" /> Session
        </h2>
        <dl className="adm-meta adm-meta--grid">
          <div>
            <dt>Role</dt>
            <dd>Administrator</dd>
          </div>
          <div>
            <dt>Last sign-in</dt>
            <dd>{formatDate(admin?.lastLoginAt, true)}</dd>
          </div>
          <div>
            <dt>Account created</dt>
            <dd>{formatDate(admin?.createdAt)}</dd>
          </div>
        </dl>
        <div className="adm-form-actions">
          <button type="button" className="adm-btn adm-btn--secondary" onClick={() => signOut()}>
            <Icon name="logout" size={16} /> Sign out
          </button>
        </div>
      </section>
    </>
  );
};

export default SettingsPage;
