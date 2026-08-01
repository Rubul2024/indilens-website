import { useState } from "react";
import "./Contact.css";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  // ========================================
  // FORM STATE
  // ========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // ========================================
  // HANDLE SUBMIT
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      setStatus("");

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
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
      console.error(error);

      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      {/* ========================================
          CONTACT SECTION
      ======================================== */}

      <section className="contact-section">
        <div className="contact-container">

          {/* ========================================
              LEFT SIDE
          ======================================== */}

          <div className="contact-info">

            <span className="contact-label">
              GET IN TOUCH
            </span>

            <h1>
              Let's Build
              <br />
              Something Amazing
              <br />
              Together
            </h1>

            <p className="contact-description">
              Whether you need a modern website,
              custom software, digital marketing,
              AI solutions or want to explore a
              business partnership, our team is
              ready to help your business grow.
            </p>

            {/* EMAIL */}

            <div className="contact-info-item">

              <div className="contact-icon">
                ✉
              </div>

              <div>

                <h3>Email Us</h3>

                <a
                  href="mailto:marketing@indilens.in"
                  className="contact-email"
                >
                  marketing@indilens.in
                </a>

              </div>

            </div>

            {/* PHONE */}

            <div className="contact-info-item">

              <div className="contact-icon">
                📞
              </div>

              <div>

                <h3>Call Us</h3>

                <a
                  href="tel:+919954639509"
                  className="contact-email"
                >
                  +91 99546 39509
                </a>

              </div>

            </div>

            {/* RESPONSE */}

            <div className="contact-info-item">

              <div className="contact-icon">
                ⏱
              </div>

              <div>

                <h3>Response Time</h3>

                <p>
                  We usually reply within
                  24 business hours.
                </p>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="contact-info-item">

              <div className="contact-icon">
                📍
              </div>

              <div>

                <h3>Office Address</h3>

                <p>
                  Assam, India
                </p>

              </div>

            </div>

          </div>

          {/* ========================================
              RIGHT SIDE
          ======================================== */}

          <div className="contact-form-card">

            <span className="contact-label">
              SEND A MESSAGE
            </span>

            <h2>
              Tell Us About Your Project
            </h2>

            <p className="form-description">
              Complete the form below and our team
              will contact you shortly.
            </p>

            {/* SUCCESS */}

            {status === "success" && (

              <div className="form-success">

                Thank you! Your message has been sent successfully.

              </div>

            )}

            {/* ERROR */}

            {status === "error" && (

              <div className="form-error">

                Something went wrong. Please try again.

              </div>

            )}

            <form onSubmit={handleSubmit}>

              {/* ========================================
                  ROW 1
              ======================================== */}

              <div className="form-row">

                <div className="form-group">

                  <label>

                    Your Name

                    <span className="required">*</span>

                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>

                    Email Address

                    <span className="required">*</span>

                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* ========================================
                  ROW 2
              ======================================== */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label>

                    Subject

                    <span className="required">*</span>

                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* ========================================
                  MESSAGE
              ======================================== */}

              <div className="form-group">

                <label>

                  Your Message

                  <span className="required">*</span>

                </label>

                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="7"
                  required
                />

              </div>

              {/* ========================================
                  BUTTON
              ======================================== */}

              <button
                className="contact-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </form>

          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;