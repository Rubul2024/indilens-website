import { Link } from "react-router-dom";

import "./GroupCompaniesSection.css";

const GroupCompaniesSection = () => {
  const companies = [
    {
      number: "01",
      domain: "indilens.live",
      title: "Legal & Compliance",
      description:
        "A professional business and compliance services division helping individuals, startups and organizations with registrations, taxation, legal documentation and business consulting.",
      services: [
        "Trust Registration",
        "GST Registration",
        "Startup Consulting",
        "ITR Services",
        "Trademark Registration",
        "Company Registration",
      ],
      link: "https://indilens.live/",
    },

    {
      number: "02",
      domain: "indilens.in",
      title: "Software & Web Development",
      description:
        "The technology and digital solutions division of the Indilens Group, focused on building modern websites, software applications and scalable digital products for businesses.",
      services: [
        "Web Development",
        "Software Development",
        "UI / UX Design",
        "MERN Stack Solutions",
        "Custom Applications",
        "Digital Solutions",
      ],
      link: "https://indilens.in/",
    },

    {
      number: "03",
      domain: "indilens.org",
      title: "CSR & Social Impact",
      description:
        "A social impact division supporting organizations and initiatives through CSR consulting, foundation support and solutions designed to create meaningful community impact.",
      services: [
        "CSR Consulting",
        "Foundation Support",
        "Social Impact",
        "NGO Support",
        "Community Initiatives",
        "Impact Programs",
      ],
      link: "https://indilens.org/",
    },

    {
      number: "04",
      domain: "Indilensweb.com",
      title: "Healthcare & Pharmaceuticals",
      description:
        "The pharmaceutical division of the Indilens Group, focused on developing and delivering quality healthcare, wellness and pharmaceutical products.",
      services: [
        "Healthcare Products",
        "Wellness Products",
        "Pharmaceutical Products",
        "Healthcare Solutions",
        "Product Development",
        "Health & Wellness",
      ],
      link: "https://indilensweb.com/",
    },
  ];

  return (
    <section className="group-companies-section">
      <div className="container">
        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className="group-companies-header">
          <div>
            <span className="group-companies-eyebrow">THE INDILENS GROUP</span>

            <h2 className="group-companies-title">
              One group.
              <span>Multiple possibilities.</span>
            </h2>
          </div>

          <div className="group-companies-intro">
            <p>
              Indilens is a diversified parent company bringing together
              specialized businesses across technology, business services,
              social impact and healthcare.
            </p>
          </div>
        </div>

        {/* ========================================
            COMPANY LIST
        ======================================== */}

        <div className="group-companies-list">
          {companies.map((company) => (
            <article className="group-company-card" key={company.domain}>
              {/* ========================================
                  CARD TOP
              ======================================== */}

              <div className="group-company-top">
                <span className="group-company-number">{company.number}</span>

                <span className="group-company-domain">{company.domain}</span>
              </div>

              {/* ========================================
                  CARD CONTENT
              ======================================== */}

              <div className="group-company-content">
                <h3>{company.title}</h3>

                <p>{company.description}</p>
              </div>

              {/* ========================================
                  SERVICES
              ======================================== */}

              <div className="group-company-services">
                {company.services.map((service) => (
                  <span key={service} className="group-company-service">
                    {service}
                  </span>
                ))}
              </div>

              {/* ========================================
                  CARD LINK
              ======================================== */}

              <a
                href={company.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group-company-link"
              >
                Explore Company
                <span>↗</span>
              </a>
            </article>
          ))}
        </div>

        {/* ========================================
            GROUP FOOTER MESSAGE
        ======================================== */}

        <div className="group-companies-footer">
          <p>
            Together, our companies bring diverse expertise under one group.
          </p>

          <Link to="/contact" className="group-companies-contact-link">
            Connect with Indilens
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GroupCompaniesSection;
