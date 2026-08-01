import "./TrustedCompanies.css";

const topCompanies = [
  "Microsoft",
  "Google",
  "Amazon",
  "Oracle",
  "Adobe",
  "IBM",
  "Cisco",
  "Dell",
];

const bottomCompanies = [
  "OpenAI",
  "Meta",
  "Infosys",
  "TCS",
  "Capgemini",
  "Accenture",
  "SAP",
  "Intel",
];

const TrustedCompanies = () => {
  return (
    <section className="trusted-section">

      <div className="trusted-header">

        <span className="trusted-badge">
          TRUSTED WORLDWIDE
        </span>

        <h2>
          Trusted by Ambitious Businesses
        </h2>

        <p>
          We partner with startups, enterprises and
          innovative businesses to build modern websites,
          software solutions and digital experiences.
        </p>

      </div>

      {/* TOP ROW */}

      <div className="trusted-slider">

        <div className="trusted-track left">

          {topCompanies.map((company, index) => (
            <div className="company-card" key={index}>
              {company}
            </div>
          ))}

          {topCompanies.map((company, index) => (
            <div
              className="company-card"
              key={`copy-${index}`}
            >
              {company}
            </div>
          ))}

        </div>

      </div>

      {/* BOTTOM ROW */}

      <div className="trusted-slider reverse">

        <div className="trusted-track right">

          {bottomCompanies.map((company, index) => (
            <div className="company-card" key={index}>
              {company}
            </div>
          ))}

          {bottomCompanies.map((company, index) => (
            <div
              className="company-card"
              key={`bottom-${index}`}
            >
              {company}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default TrustedCompanies;