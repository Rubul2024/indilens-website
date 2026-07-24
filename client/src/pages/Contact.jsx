

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);

      alert(
        "Unable to send message. Please make sure the backend server is running.",
      );
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

            {success && (
              <div className="success-message">
                <span className="success-icon">✓</span>

                <span>Message sent successfully!</span>
              </div>
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

      {/* =========================
          CONTACT PAGE CSS
      ========================== */}

      <style>{`

        /* ===================================
           CONTACT PAGE
        =================================== */

        .contact-page {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          color: #0b1f3a;
        }


        /* ===================================
           MAIN SECTION
        =================================== */

        .contact-section {
          width: 100%;
          padding: 80px 20px;
          box-sizing: border-box;
        }


        /* ===================================
           CONTAINER
        =================================== */

        .contact-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;

          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1.15fr);

          gap: 70px;

          align-items: start;
        }


        /* ===================================
           LEFT SIDE
        =================================== */

        .contact-info {
          padding-top: 5px;
        }


        .contact-label {
          display: inline-block;

          margin-bottom: 22px;

          color: #2563eb;

          font-size: 13px;
          font-weight: 700;

          letter-spacing: 2px;
        }


        .contact-info h1 {
          margin: 0 0 24px;

          font-size: 48px;
          line-height: 1.1;

          font-weight: 700;

          color: #0b1f3a;
        }


        .contact-description {
          max-width: 500px;

          margin-bottom: 45px;

          color: #64748b;

          font-size: 17px;
          line-height: 1.8;
        }


        /* ===================================
           CONTACT DETAILS
        =================================== */

        .contact-detail {
          display: flex;

          align-items: center;

          gap: 18px;

          margin-bottom: 28px;
        }


        .contact-icon {
          width: 50px;
          height: 50px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background: #eff6ff;

          font-size: 21px;
        }


        .contact-detail h3 {
          margin: 0 0 5px;

          font-size: 16px;

          color: #0b1f3a;
        }


        .contact-detail p {
          margin: 0;

          color: #64748b;

          font-size: 15px;
        }


        /* ===================================
           FORM CARD
        =================================== */

        .contact-form-card {
          padding: 45px;

          background: #ffffff;

          border: 1px solid #e2e8f0;

          border-radius: 24px;

          box-shadow:
            0 20px 60px
            rgba(15, 23, 42, 0.08);

          box-sizing: border-box;
        }


        .contact-form-card h2 {
          margin: 0 0 12px;

          font-size: 32px;
          line-height: 1.2;

          color: #0b1f3a;
        }


        .form-description {
          margin: 0 0 35px;

          color: #64748b;

          font-size: 16px;
        }


        /* ===================================
           SUCCESS MESSAGE
        =================================== */

        .success-message {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 25px;

          padding: 14px 18px;

          border-radius: 12px;

          background: #ecfdf5;

          border: 1px solid #86efac;

          color: #15803d;

          font-weight: 600;

          animation:
            successPop
            0.4s ease;
        }


        .success-icon {
          width: 26px;
          height: 26px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #22c55e;

          color: white;

          font-size: 15px;
        }


        @keyframes successPop {

          0% {
            opacity: 0;
            transform: scale(0.8);
          }

          70% {
            transform: scale(1.05);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }

        }


        /* ===================================
           FORM ROW
        =================================== */

        .form-row {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 20px;

          margin-bottom: 22px;
        }


        /* ===================================
           FORM GROUP
        =================================== */

        .form-group {
          width: 100%;
          margin-bottom: 22px;
        }


        .form-row .form-group {
          margin-bottom: 0;
        }


        .form-group label {
          display: block;

          margin-bottom: 9px;

          color: #0b1f3a;

          font-size: 14px;

          font-weight: 600;
        }


        .required {
          margin-left: 3px;

          color: #ef4444;

          font-size: 16px;
        }


        /* ===================================
           INPUTS
        =================================== */

        .form-group input,
        .form-group textarea {

          width: 100%;

          padding: 15px 16px;

          box-sizing: border-box;

          border: 1px solid #cbd5e1;

          border-radius: 10px;

          background: #ffffff;

          color: #0b1f3a;

          font-family: inherit;

          font-size: 15px;

          outline: none;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }


        .form-group input {
          height: 54px;
        }


        .form-group textarea {
          min-height: 150px;

          resize: vertical;
        }


        .form-group input:focus,
        .form-group textarea:focus {

          border-color: #2563eb;

          box-shadow:
            0 0 0 3px
            rgba(37, 99, 235, 0.1);
        }


        /* ===================================
           SUBMIT BUTTON
        =================================== */

        .contact-submit-btn {

          width: 100%;

          min-height: 56px;

          border: none;

          border-radius: 10px;

          background: #2563eb;

          color: #ffffff;

          font-size: 16px;

          font-weight: 600;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }


        .contact-submit-btn:hover {

          background: #1d4ed8;

          transform:
            translateY(-2px);

          box-shadow:
            0 10px 25px
            rgba(37, 99, 235, 0.25);
        }


        .contact-submit-btn:disabled {

          opacity: 0.7;

          cursor: not-allowed;

          transform: none;
        }


        /* ===================================
           TABLET
        =================================== */

        @media (max-width: 900px) {

          .contact-container {

            grid-template-columns: 1fr;

            gap: 50px;

            max-width: 700px;
          }

          .contact-info h1 {

            font-size: 42px;
          }

        }


        /* ===================================
           MOBILE
        =================================== */

        @media (max-width: 600px) {

          .contact-section {

            padding:
              50px 16px;
          }


          .contact-info h1 {

            font-size: 36px;
          }


          .contact-description {

            font-size: 16px;
          }


          .contact-form-card {

            padding: 25px 20px;

            border-radius: 18px;
          }


          .contact-form-card h2 {

            font-size: 27px;
          }


          .form-row {

            grid-template-columns: 1fr;

            gap: 0;
          }


          .form-row .form-group {

            margin-bottom: 22px;
          }

        }

      `}</style>
    </main>
  );
};

export default Contact;
