import { Link } from "react-router-dom";

import "./IndustriesSection.css";

const IndustriesSection = () => {
  const industries = [
    {
      number: "01",
      title: "Startups",
      description:
        "Helping new businesses build strong digital foundations and launch with confidence.",
    },

    {
      number: "02",
      title: "Small & Medium Businesses",
      description:
        "Practical digital solutions that help growing businesses improve their online presence.",
    },

    {
      number: "03",
      title: "E-commerce",
      description:
        "Creating seamless digital experiences that help online businesses connect with customers.",
    },

    {
      number: "04",
      title: "Education",
      description:
        "Building accessible and engaging digital platforms for modern learning experiences.",
    },

    {
      number: "05",
      title: "Healthcare",
      description:
        "Designing thoughtful digital experiences that prioritize accessibility and user needs.",
    },

    {
      number: "06",
      title: "Professional Services",
      description:
        "Helping service-based businesses present their expertise and grow their digital presence.",
    },
  ];

  return (
    <section className="industries-section">
      <div className="container">
        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className="industries-header">
          <div>
            <span className="industries-eyebrow">WHO WE SERVE</span>

            <h2 className="industries-title">
              Digital experiences
              <span>for different ambitions.</span>
            </h2>
          </div>

          <div className="industries-intro">
            <p>
              Every business has different goals. We create flexible digital
              solutions that adapt to your needs, industry and stage of growth.
            </p>

            <Link to="/contact" className="industries-link">
              Let's Work Together
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ========================================
            INDUSTRIES LIST
        ======================================== */}

        <div className="industries-list">
          {industries.map((industry) => (
            <div className="industry-item" key={industry.number}>
              {/* Large Background Number */}

              <span className="industry-bg-number">{industry.number}</span>

              {/* Industry Number */}

              <span className="industry-number">{industry.number}</span>

              {/* Industry Content */}

              <div className="industry-content">
                <h3>{industry.title}</h3>

                <p>{industry.description}</p>
              </div>

              {/* Arrow */}

              <div className="industry-arrow">↗</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
