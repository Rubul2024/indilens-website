import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
];

// Extra destinations that only fit in the mobile menu
const MOBILE_EXTRA_LINKS = [
  { to: "/group-companies", label: "Group Companies" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the menu whenever the route changes (including back/forward)
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  /* ========================================
     HANDLE SCROLL
  ======================================== */

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ========================================
     MOBILE MENU: SCROLL LOCK, ESCAPE, RESIZE
  ======================================== */

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = (base) => ({ isActive }) => (isActive ? `${base} active` : base);

  return (
    <header className={`navbar ${scrolled || menuOpen ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* LOGO */}

        <Link to="/" className="navbar-logo" onClick={closeMenu} aria-label="Indilens home">
          <img
            src="/images/indilens-logo.png"
            alt="Indilens"
            className="navbar-logo-image"
            width="150"
            height="48"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass("nav-link")}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP CTA */}

        <Link to="/contact" className="navbar-cta">
          Let's Talk
          <span aria-hidden="true">→</span>
        </Link>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className={`mobile-menu-button ${menuOpen ? "menu-button-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE NAVIGATION */}

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav className="mobile-menu-inner" aria-label="Mobile navigation">
          {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={linkClass("mobile-nav-link")}
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </NavLink>
          ))}

          <Link to="/contact" className="mobile-menu-cta" onClick={closeMenu}>
            Let's Talk
            <span aria-hidden="true">→</span>
          </Link>

          <div className="mobile-menu-contact">
            <a href="mailto:marketing@indilens.in">marketing@indilens.in</a>
            <a href="tel:+919954639509">+91 99546 39509</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
