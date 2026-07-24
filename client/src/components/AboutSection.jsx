import { Link } from "react-router-dom";

import "./AboutSection.css";

const AboutSection = () => {
  const stats = [
    {
      number: "10+",
      label: "Years of Experience",
    },
    {
      number: "50+",
      label: "Projects Delivered",
    },
    {
      number: "20+",
      label: "Happy Clients",
    },
    {
      number: "100%",
      label: "Commitment",
    },
  ];

  return (
    <section className="about-section">
      <div className="container">
        {/* ========================================
            ABOUT MAIN CONTENT
        ======================================== */}

        <div className="about-grid">
          {/* ========================================
              LEFT CONTENT
          ======================================== */}

          <div className="about-content">
            {/* Eyebrow */}

            <span className="about-eyebrow">WHO WE ARE</span>

            {/* Heading */}

            <h2 className="about-title">
              We turn ideas into
              <span>meaningful digital experiences.</span>
            </h2>

            {/* Description */}

            <p className="about-description">
              Indilens is a digital solutions company focused on helping
              businesses build stronger digital identities and better
              experiences.
            </p>

            <p className="about-description">
              From strategy and design to technology and digital growth, we
              combine creativity with practical solutions to help brands move
              forward with confidence.
            </p>

            {/* CTA */}

            <Link to="/about" className="about-button">
              Discover Indilens
              <span>→</span>
            </Link>
          </div>

          {/* ========================================
              RIGHT VISUAL
          ======================================== */}

          <div className="about-visual">
            {/* Main Visual Card */}

            <div className="about-main-card">
              <div className="about-card-top">
                <span>INDILENS</span>

                <span>DIGITAL SOLUTIONS</span>
              </div>

              <div className="about-card-center">
                <div className="about-card-circle">I</div>

                <h3>
                  Think.
                  <span>Create.</span>
                  Grow.
                </h3>
              </div>

              <div className="about-card-bottom">
                <span>STRATEGY</span>

                <span>DESIGN</span>

                <span>TECHNOLOGY</span>
              </div>
            </div>

            {/* Floating Badge */}

            <div className="about-floating-badge">
              <span className="about-badge-icon">✦</span>

              <div>
                <strong>Digital First</strong>

                <span>Built for modern businesses</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            STATISTICS
        ======================================== */}

        <div className="about-stats">
          {stats.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <strong>{stat.number}</strong>

              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
