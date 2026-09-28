import { useState } from "react";

import SEO from "../components/SEO";

import "./Contact.css";

const API_URL = import.meta.env.VITE_API_URL;

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ADDRESS = "Barpeta Road, Shakti Nagar, Azad Nagar, Barpeta Road, Assam 781315";

// Small stroke icons (24x24, currentColor)
const ICONS = {
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 1 8 7 8-7",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  pin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zm-9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2",
  check: "M20 6 9 17l-5-5",
};

const Icon = ({ name }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={ICONS[name]} />
  </svg>
);

const CONTACT_DETAILS = [
  {
    icon: "mail",
    label: "Email",
    value: "marketing@indilens.in",
    href: "mailto:marketing@indilens.in",
  },
  {
    icon: "phone",
    label: "Phone",
    value: "+91 99546 39509",
    href: "tel:+919954639509",
  },
  {
    icon: "pin",
    label: "Office",
    value: ADDRESS,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
    external: true,
  },
  {
    icon: "clock",
    label: "Response time",
    value: "Within 24 business hours",
  },
];

const NEXT_STEPS = [
  "We review your message and requirements.",
  "A team member contacts you within 24 business hours.",
  "We schedule a call to discuss scope, timeline and budget.",
];

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setStatus("");

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setFormData(EMPTY_FORM);
    } catch (error) {
      setErrorMessage(
        error instanceof TypeError
          ? "Unable to connect right now. Please try again, or email us at marketing@indilens.in."
          : error.message
      );
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <SEO
        title="Contact Indilens Web Group | Start Your Digital Project"
        description="Contact Indilens to discuss your website, software, digital marketing or technology project. Let's build a modern digital solution for your business."
        canonical="/contact"
      />

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <section className="ct-header">
        <div className="container">
          <span className="section-label">Contact Us</span>

          <h1>Let's build something great together</h1>

          <p>
            Tell us about your website, software or digital marketing needs. Our team will
            get back to you with the right next steps.
          </p>
        </div>
      </section>

      {/* ========================================
          CONTACT CONTENT
      ======================================== */}

      <section className="ct-body">
        <div className="container ct-grid">
          {/* DETAILS */}

          <aside className="ct-aside">
            <div className="ct-card">
              <h2 className="ct-card-title">Contact information</h2>

              <ul className="ct-details">
                {CONTACT_DETAILS.map((item) => (
                  <li key={item.label}>
                    <span className="ct-icon">
                      <Icon name={item.icon} />
                    </span>

                    <span className="ct-detail-text">
                      <span className="ct-detail-label">{item.label}</span>

                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="ct-detail-value">{item.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ct-card ct-card--soft">
              <h2 className="ct-card-title">What happens next</h2>

              <ol className="ct-steps">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step}>
                    <span className="ct-step-number">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* FORM */}

          <div className="ct-card ct-form-card">
            <h2 className="ct-form-title">Send us a message</h2>

            <p className="ct-form-intro">
              Fields marked <span className="ct-required">*</span> are required.
            </p>

            <div aria-live="polite">
              {status === "success" && (
                <div className="ct-alert ct-alert--success" role="status">
                  <Icon name="check" />
                  <span>
                    Thank you! Your message has been sent. We'll get back to you within 24
                    business hours.
                  </span>
                </div>
              )}

              {status === "error" && (
                <div className="ct-alert ct-alert--error" role="alert">
                  <span>{errorMessage || "Something went wrong. Please try again."}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="contact-name">
                    Full name <span className="ct-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="contact-email">
                    Email address <span className="ct-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={150}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="contact-phone">
                    Phone number <span className="ct-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+()\-\s]{7,20}"
                    title="Enter a valid phone number"
                    maxLength={20}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="contact-subject">
                    Subject <span className="ct-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="e.g. New business website"
                    maxLength={200}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="ct-field">
                <label htmlFor="contact-message">
                  Message <span className="ct-required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us a little about your project, goals and timeline…"
                  maxLength={5000}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="ct-submit contact-submit-btn" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Send message"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>

              <p className="ct-privacy">
                We respect your privacy. Your details are only used to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
