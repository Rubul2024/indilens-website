import { Link } from "react-router-dom";

import "./ServicesSection.css";

const ServicesSection = () => {
  const services = [
    {
      number: "01",
      title: "Web Design & Development",
      description:
        "Modern, responsive and high-performance websites designed to create strong digital experiences.",
      tag: "Web",
    },

    {
      number: "02",
      title: "MERN Stack Development",
      description:
        "Scalable full-stack web applications built with modern JavaScript technologies and clean architecture.",
      tag: "Development",
    },

    {
      number: "03",
      title: "UI/UX Design",
      description:
        "User-focused interfaces and thoughtful experiences that make digital products simple and enjoyable.",
      tag: "Design",
    },

    {
      number: "04",
      title: "Digital Strategy",
      description:
        "Practical digital strategies that connect business goals, technology and customer expectations.",
      tag: "Strategy",
    },

    {
      number: "05",
      title: "Business Solutions",
      description:
        "Custom digital solutions that help businesses improve workflows, efficiency and online operations.",
      tag: "Solutions",
    },

    {
      number: "06",
      title: "Maintenance & Support",
      description:
        "Reliable ongoing support, updates and improvements to keep your digital products secure and effective.",
      tag: "Support",
    },
  ];

  return (
    <section className="services-section">
      <div className="container">
        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className="services-header">
          <div className="services-heading">
            <span className="services-eyebrow">WHAT WE DO</span>

            <h2 className="services-title">
              Digital solutions
              <span>built around your goals.</span>
            </h2>
          </div>

          <div className="services-intro">
            <p>
              We combine strategy, design and technology to build digital
              experiences that help businesses move forward.
            </p>

            <Link to="/services" className="services-view-link">
              View All Services
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ========================================
            SERVICES GRID
        ======================================== */}

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              {/* Card Top */}

              <div className="service-card-top">
                <span className="service-number">{service.number}</span>

                <span className="service-tag">{service.tag}</span>
              </div>

              {/* Card Icon */}

              <div className="service-icon">
                <span>↗</span>
              </div>

              {/* Card Content */}

              <div className="service-card-content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>

              {/* Card Footer */}

              <div className="service-card-footer">
                <span>Explore Service</span>

                <span className="service-arrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
