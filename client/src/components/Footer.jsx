import { Link } from "react-router-dom";

import "./Footer.css";

// Add profile URLs here to show a "Follow Us" column instead of contact details.
// Links without a URL are hidden, so the footer never shows dead links.
const SOCIAL_LINKS = [
  { label: "LinkedIn", url: "" },
  { label: "Facebook", url: "" },
  { label: "Instagram", url: "" },
  { label: "YouTube", url: "" },
];

const socialLinks = SOCIAL_LINKS.filter((social) => social.url);

const COLUMNS = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/team", label: "Our Team" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/services", label: "Web Development" },
      { to: "/services", label: "Software Development" },
      { to: "/services", label: "UI / UX Design" },
      { to: "/services", label: "Digital Solutions" },
    ],
  },
  {
    title: "Explore",
    links: [
      { to: "/portfolio", label: "Portfolio" },
      { to: "/group-companies", label: "Group Companies" },
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Start a Project" },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          {/* BRAND */}

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Indilens Web Solutions
            </Link>

            <p className="footer-description">
              We build modern digital experiences that help businesses grow, connect and move
              forward.
            </p>
          </div>

          {/* LINK COLUMNS */}

          {COLUMNS.map((column) => (
            <nav className="footer-column" key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>

              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* CONTACT / SOCIAL */}

          <div className="footer-column">
            <h3>{socialLinks.length ? "Follow Us" : "Get in Touch"}</h3>

            <ul>
              {socialLinks.length ? (
                socialLinks.map((social) => (
                  <li key={social.label}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.label}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a href="mailto:marketing@indilens.in">marketing@indilens.in</a>
                  </li>
                  <li>
                    <a href="tel:+919954639509">+91 99546 39509</a>
                  </li>
                  <li>
                    <span className="footer-address">Barpeta Road, Assam 781315</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div className="footer-bottom">
          <p>© 2010–{currentYear} Indilens Web Solutions Pvt. Ltd. All rights reserved.</p>

          <nav className="footer-legal-links" aria-label="Legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
