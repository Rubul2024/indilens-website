import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(
        "https://indilens-website.vercel.app/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      {/* =========================
          CONTACT HERO SECTION
      ========================== */}

      <section className="contact-section">
        <div className="contact-container">
          {/* =========================
              LEFT SIDE
          ========================== */}

          <div className="contact-info">
            <span className="contact-label">GET IN TOUCH</span>

            <h1>
              Let’s Start a
              <br />
              Conversation
            </h1>

            <p className="contact-description">
              Whether you need a modern website, custom software, digital
              solutions, or want to explore a business partnership, we would
              love to hear from you.
            </p>

            {/* Email */}

            <div className="contact-detail">
              <div className="contact-icon">✉</div>

              <div>
                <h3>Email Us</h3>

                <a href="mailto:info@indilens.com" className="contact-email">
                  info@indilens.com
                </a>
              </div>
            </div>

            {/* Website */}

            <div className="contact-detail">
              <div className="contact-icon">🌐</div>

              <div>
                <h3>Website</h3>

                <a
                  href="https://www.indilens.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-website"
                >
                  www.indilens.com
                </a>
              </div>
            </div>

            {/* Response Time */}

            <div className="contact-detail">
              <div className="contact-icon">⏱</div>

              <div>
                <h3>Response Time</h3>

                <p>We usually respond within 1–2 business days.</p>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT SIDE FORM
          ========================== */}

          <div className="contact-form-card">
            <span className="contact-label">SEND US A MESSAGE</span>

            <h2>Tell Us About Your Project</h2>

            <p className="form-description">
              Fill out the form below and we'll get back to you soon.
            </p>

            {/* SUCCESS MESSAGE */}

            {status === "success" && (
              <p className="form-success">
                Thank you! Your message has been sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="form-error">
                Sorry, something went wrong. Please try again.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              {/* =========================
                  ROW 1
                  NAME + EMAIL
              ========================== */}

              <div className="form-row">
                {/* Name */}

                <div className="form-group">
                  <label>
                    Your Name
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}

                <div className="form-group">
                  <label>
                    Email Address
                    <span className="required">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* =========================
                  ROW 2
                  PHONE + SUBJECT
              ========================== */}

              <div className="form-row">
                {/* Phone */}

                <div className="form-group">
                  <label>
                    Phone Number
                    <span className="required">*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subject */}

                <div className="form-group">
                  <label>Subject</label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="What can we help with?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* =========================
                  MESSAGE
              ========================== */}

              <div className="form-group">
                <label>Your Message</label>

                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                />
              </div>

              {/* =========================
                  SUBMIT BUTTON
              ========================== */}

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
