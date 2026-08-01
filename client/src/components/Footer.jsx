import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">

{/* ========================================
    TECH GRID BACKGROUND
======================================== */}

<div className="footer-grid-bg">

  <div className="grid-overlay"></div>

  <div className="grid-glow"></div>

</div>
      
      <div className="container">

        {/* ========================================
            FOOTER BRAND
        ======================================== */}

        <div className="footer-brand-section">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              INDILENS
            </Link>

            <p className="footer-description">
              We build modern digital experiences that help businesses grow,
              connect and move forward.
            </p>
          </div>
        </div>

        {/* ========================================
            FOOTER NAVIGATION
        ======================================== */}

        <div className="footer-navigation">
          {/* ========================================
              COMPANY
          ======================================== */}

          <div className="footer-column">
            <h3>Company</h3>

            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>

              <li>
                <Link to="/team">Our Team</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>

              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          {/* ========================================
              SERVICES
          ======================================== */}

          <div className="footer-column">
            <h3>Services</h3>

            <ul>
              <li>
                <Link to="/services">Web Development</Link>
              </li>

              <li>
                <Link to="/services">Software Development</Link>
              </li>

              <li>
                <Link to="/services">UI / UX Design</Link>
              </li>

              <li>
                <Link to="/services">Digital Solutions</Link>
              </li>
            </ul>
          </div>

          {/* ========================================
              EXPLORE
          ======================================== */}

          <div className="footer-column">
            <h3>Explore</h3>

            <ul>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>

              <li>
                <Link to="/group-companies">Group Companies</Link>
              </li>

              <li>
                <Link to="/faq">FAQ</Link>
              </li>

              <li>
                <Link to="/contact">Start a Project</Link>
              </li>
            </ul>
          </div>

          {/* ========================================
              SOCIAL LINKS
          ======================================== */}

          <div className="footer-column footer-social-column">
            <h3>Follow Us</h3>

            <div className="footer-social-links">
              <a href="#" aria-label="LinkedIn">
                LinkedIn
              </a>

              <a href="#" aria-label="Facebook">
                Facebook
              </a>

              <a href="#" aria-label="Instagram">
                Instagram
              </a>

              <a href="#" aria-label="YouTube">
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* ========================================
            NEWSLETTER
        ======================================== */}

        <div className="footer-newsletter">
          <div className="footer-newsletter-content">
            <span className="footer-newsletter-label">STAY IN THE LOOP</span>

            <h3>Get useful digital insights in your inbox.</h3>
          </div>

          <form
  className="footer-newsletter-form"
  onSubmit={async (event) => {

    // Stop page refresh
    event.preventDefault();

    // Get email value
    const email = event.target.email.value.trim();

    // Check email
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {

      // Send email to backend
      const response = await fetch(
        "http://localhost:5000/api/newsletter",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
          }),
        }
      );

      // Get backend response
      const data = await response.json();

      // Check response
      if (response.ok) {

        alert(
          data.message ||
          "Subscribed successfully!"
        );

        // Clear input
        event.target.reset();

      } else {

        alert(
          data.message ||
          "Subscription failed. Please try again."
        );

      }

    } catch (error) {

      console.error(
        "Newsletter Error:",
        error
      );

      alert(
        "Unable to connect to server. Please try again."
      );

    }

  }}
>
  <input
    type="email"
    name="email"
    placeholder="Enter your email address"
    aria-label="Email address"
    required
  />

  <button type="submit">
    Subscribe
    <span>→</span>
  </button>
</form>
        </div>

        {/* ========================================
            FOOTER BOTTOM
        ======================================== */}

        <div className="footer-bottom">
          <p>© 2010-{currentYear} Indilens Web Solutions Pvt. Ltd. All rights reserved.</p>

          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>

            <Link to="/terms">Terms & Conditions</Link>

            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
