import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* ========================================
          HERO BACKGROUND
      ======================================== */}

      <div className="hero-background">
        <div className="hero-glow hero-glow-one"></div>

        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-grid"></div>
      </div>

      <div className="container hero-container">
        {/* ========================================
            HERO CONTENT
        ======================================== */}

        <div className="hero-content">
          {/* Eyebrow */}

          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot"></span>
            Digital Experiences That Matter
          </div>

          {/* Main Heading */}

          <h1 className="hero-title">
            We Build Digital
            <span>Experiences</span>
            That Move Businesses Forward.
          </h1>

          {/* Description */}

          <p className="hero-description">
            Indilens helps ambitious businesses build modern digital
            experiences, powerful websites and scalable technology solutions
            that create meaningful impact.
          </p>

          {/* CTA Buttons */}

          <div className="hero-actions">
            <Link to="/contact" className="hero-primary-button">
              Start a Project
              <span>→</span>
            </Link>

            <Link to="/portfolio" className="hero-secondary-button">
              Explore Our Work
            </Link>
          </div>

          {/* Trust Text */}

          <div className="hero-trust">
            <span>Trusted digital solutions</span>

            <div className="hero-trust-line"></div>

            <span>Built for growth</span>
          </div>
        </div>

        {/* ========================================
            HERO VISUAL
        ======================================== */}

        <div className="hero-visual">
          {/* Main Card */}

          <div className="hero-main-card">
            {/* Card Header */}

            <div className="hero-card-header">
              <div>
                <span className="hero-card-label">DIGITAL</span>

                <h3>
                  Growth
                  <br />
                  Dashboard
                </h3>
              </div>

              <div className="hero-card-icon">↗</div>
            </div>

            {/* Chart */}

            <div className="hero-chart">
              <div className="chart-line">
                <span className="chart-point point-one"></span>

                <span className="chart-point point-two"></span>

                <span className="chart-point point-three"></span>

                <span className="chart-point point-four"></span>

                <span className="chart-point point-five"></span>
              </div>

              <div className="chart-labels">
                <span>Jan</span>

                <span>Mar</span>

                <span>May</span>

                <span>Jul</span>

                <span>Sep</span>
              </div>
            </div>

            {/* Card Footer */}

            <div className="hero-card-footer">
              <div>
                <span>Digital Growth</span>

                <strong>+84.6%</strong>
              </div>

              <div className="hero-growth-badge">↗ Growing</div>
            </div>
          </div>

          {/* ========================================
              FLOATING CARD — PROJECTS
          ======================================== */}

          <div className="hero-floating-card hero-project-card">
            <div className="floating-icon">✦</div>

            <div>
              <span>Projects</span>

              <strong>50+</strong>
            </div>
          </div>

          {/* ========================================
              FLOATING CARD — EXPERIENCE
          ======================================== */}

          <div className="hero-floating-card hero-experience-card">
            <div className="floating-icon">★</div>

            <div>
              <span>Experience</span>

              <strong>10+ Years</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          HERO BOTTOM
      ======================================== */}

      <div className="hero-bottom">
        <div className="container hero-bottom-container">
          <div className="hero-scroll">
            <span className="hero-scroll-line"></span>
            Scroll to explore
          </div>

          <div className="hero-bottom-text">
            Strategy
            <span>•</span>
            Design
            <span>•</span>
            Technology
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
