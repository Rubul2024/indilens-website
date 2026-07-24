import "./TrustedCompanies.css";

const TrustedCompanies = () => {
  const companies = ["NEXORA", "TECHVISTA", "BRIGHTLAB", "ORBITAL", "VERTEX"];

  return (
    <section className="trusted-section">
      <div className="container">
        {/* ========================================
            TRUSTED HEADER
        ======================================== */}

        <div className="trusted-header">
          <span className="trusted-label">Trusted by ambitious businesses</span>

          <p className="trusted-description">
            Helping businesses turn ideas into meaningful digital experiences.
          </p>
        </div>

        {/* ========================================
            COMPANY LOGOS
        ======================================== */}

        <div className="trusted-companies">
          {companies.map((company) => (
            <div className="trusted-company" key={company}>
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
