import { useState } from "react";

import { subscribeNewsletter } from "../services/api";
import "./NewsletterForm.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shared newsletter sign-up used in the footer and on the blog.
// `className` keeps each location's existing form styles.
const NewsletterForm = ({ className = "", buttonLabel = "Subscribe", showArrow = false, tone = "light" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await subscribeNewsletter(cleanEmail);
      setStatus({ type: "success", message: data.message || "Thanks for subscribing!" });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof TypeError
            ? "Unable to connect right now. Please try again later."
            : error.message || "Subscription failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`newsletter-form-wrap newsletter-form-wrap--${tone}`}>
      <form className={className} onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          aria-label="Email address"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.type === "error") setStatus({ type: "", message: "" });
          }}
          disabled={submitting}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Subscribing…" : buttonLabel}
          {showArrow && !submitting && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <p
        className={`newsletter-status ${status.type ? `newsletter-status--${status.type}` : ""}`}
        role={status.type === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {status.message}
      </p>
    </div>
  );
};

export default NewsletterForm;
