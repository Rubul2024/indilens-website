import { Link } from "react-router-dom";

import "./WhyChooseSection.css";

const WhyChooseSection = () => {
  const reasons = [
    {
      number: "01",
      title: "Business-First Thinking",
      description:
        "We don't build digital products just for the sake of technology. We focus on understanding your business goals and creating solutions that support real growth.",
    },

    {
      number: "02",
      title: "Modern Technology",
      description:
        "We use modern technologies and development practices to create digital experiences that are fast, scalable, secure and ready for the future.",
    },

    {
      number: "03",
      title: "User-Centered Experiences",
      description:
        "Every interaction matters. We focus on creating intuitive and thoughtful experiences that make your website or application easy and enjoyable to use.",
    },

    {
      number: "04",
      title: "Long-Term Partnership",
      description:
        "Our relationship doesn't end when your project launches. We believe in building long-term partnerships that help your digital presence evolve with your business.",
    },
  ];

  return (
    <section className="why-choose-section">
      <div className="container">
        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className="why-choose-header">
          <div className="why-choose-heading">
            <span className="why-choose-eyebrow">WHY INDILENS</span>

            <h2 className="why-choose-title">
              More than a digital
              <span>service provider.</span>
            </h2>
          </div>

          <div className="why-choose-intro">
            <p>
              We combine strategy, design and technology to create digital
              solutions that are built around your business, your users and your
              future.
            </p>
          </div>
        </div>

        {/* ========================================
            REASONS
        ======================================== */}

        <div className="why-choose-list">
          {reasons.map((reason) => (
            <div className="why-choose-item" key={reason.number}>
              {/* Number */}

              <span className="why-choose-number">{reason.number}</span>

              {/* Content */}

              <div className="why-choose-content">
                <h3>{reason.title}</h3>

                <p>{reason.description}</p>
              </div>

              {/* Arrow */}

              <div className="why-choose-arrow">↗</div>
            </div>
          ))}
        </div>

        {/* ========================================
            CTA
        ======================================== */}

        <div className="why-choose-cta">
          <div>
            <span className="why-choose-cta-label">
              HAVE A PROJECT IN MIND?
            </span>

            <h3>Let's build something meaningful together.</h3>
          </div>

          <Link to="/contact" className="why-choose-cta-button">
            Start a Conversation
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
