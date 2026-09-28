import { Link } from "react-router-dom";

import "./Footer.css";
import NewsletterForm from "./NewsletterForm";

// Add profile URLs here to show a "Follow Us" column instead of contact details.
// Links without a URL are hidden, so the footer never shows dead links.
const SOCIAL_LINKS = [
  { label: "LinkedIn", url: "" },
  { label: "Facebook", url: "" },
  { label: "Instagram", url: "" },
  { label: "YouTube", url: "" },
];

const socialLinks = SOCIAL_LINKS.filter((social) => social.url);

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
              Indilens Web Solutions
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
            <h3>{socialLinks.length ? "Follow Us" : "Get in Touch"}</h3>

            <div className="footer-social-links">
              {socialLinks.length ? (
                socialLinks.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                ))
              ) : (
                <>
                  <a href="mailto:marketing@indilens.in">marketing@indilens.in</a>
                  <a href="tel:+919954639509">+91 99546 39509</a>
                  <span className="footer-address">Barpeta Road, Assam 781315</span>
                </>
              )}
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

          <NewsletterForm className="footer-newsletter-form" showArrow tone="dark" />
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
