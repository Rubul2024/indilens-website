import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  /* ========================================
     HANDLE SCROLL
  ======================================== */

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ========================================
     CLOSE MOBILE MENU
  ======================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* ========================================
     PREVENT BODY SCROLL
     WHEN MOBILE MENU IS OPEN
  ======================================== */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* ========================================
            LOGO
        ======================================== */}

        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-mark">I</span>

          <span className="logo-text">Indilens</span>
        </Link>

        {/* ========================================
            DESKTOP NAVIGATION
        ======================================== */}

        <nav className="desktop-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Portfolio
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Team
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            FAQ
          </NavLink>
        </nav>

        {/* ========================================
            DESKTOP CTA
        ======================================== */}

        <Link to="/contact" className="navbar-cta">
          Let's Talk
          <span>→</span>
        </Link>

        {/* ========================================
            MOBILE MENU BUTTON
        ======================================== */}

        <button
          className={`mobile-menu-button ${menuOpen ? "menu-button-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>

          <span></span>

          <span></span>
        </button>
      </div>

      {/* ========================================
          MOBILE NAVIGATION
      ======================================== */}

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-inner">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/portfolio"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            Portfolio
          </NavLink>

          <NavLink
            to="/team"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            Team
          </NavLink>

          <NavLink
            to="/blog"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/faq"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            FAQ
          </NavLink>

          {/* ========================================
              MOBILE CTA
          ======================================== */}

          <Link to="/contact" className="mobile-menu-cta" onClick={closeMenu}>
            Let's Talk
            <span>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
