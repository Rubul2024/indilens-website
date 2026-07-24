import "./Terms.css";

const Terms = () => {
  return (
    <main className="legal-page">
      {/* ========================================
          LEGAL HERO
      ======================================== */}

      <section className="legal-hero">
        <div className="container">
          <div className="legal-hero-content">
            <span className="section-label">Legal Information</span>

            <h1>
              Terms &<span>Conditions</span>
            </h1>

            <p>
              These terms explain the conditions that apply when you access and
              use the Indilens website and services.
            </p>

            <span className="legal-updated">Last Updated: July 2026</span>
          </div>
        </div>
      </section>

      {/* ========================================
          TERMS CONTENT
      ======================================== */}

      <section className="legal-content-section">
        <div className="container">
          <div className="legal-layout">
            {/* ========================================
                SIDEBAR
            ======================================== */}

            <aside className="legal-sidebar">
              <span>On This Page</span>

              <a href="#acceptance">Acceptance of Terms</a>

              <a href="#services">Our Services</a>

              <a href="#projects">Project Engagements</a>

              <a href="#payments">Payments</a>

              <a href="#intellectual-property">Intellectual Property</a>

              <a href="#client-responsibilities">Client Responsibilities</a>

              <a href="#liability">Limitation of Liability</a>

              <a href="#changes">Changes to Terms</a>

              <a href="#contact">Contact</a>
            </aside>

            {/* ========================================
                MAIN CONTENT
            ======================================== */}

            <article className="legal-content">
              <section id="acceptance">
                <h2>1. Acceptance of Terms</h2>

                <p>
                  By accessing or using the Indilens website, you agree to
                  comply with these Terms and Conditions.
                </p>

                <p>
                  If you do not agree with these terms, please do not use the
                  website or services.
                </p>
              </section>

              <section id="services">
                <h2>2. Our Services</h2>

                <p>
                  Indilens provides digital services that may include website
                  development, web application development, UI/UX design and
                  other technology-related solutions.
                </p>

                <p>
                  The exact scope of services will depend on the requirements
                  and agreement associated with each individual project.
                </p>
              </section>

              <section id="projects">
                <h2>3. Project Engagements</h2>

                <p>
                  Project requirements, timelines, deliverables and
                  responsibilities may be defined and agreed upon separately for
                  each project.
                </p>

                <p>
                  Changes to project requirements may affect project timelines,
                  scope and associated costs.
                </p>
              </section>

              <section id="payments">
                <h2>4. Payments</h2>

                <p>
                  Payment terms will be agreed upon before project work begins.
                </p>

                <p>
                  Depending on the project, payments may be divided into
                  milestones or stages.
                </p>
              </section>

              <section id="intellectual-property">
                <h2>5. Intellectual Property</h2>

                <p>
                  Ownership of project deliverables, source code, designs and
                  other materials will depend on the agreement established for
                  each individual project.
                </p>

                <p>
                  Third-party libraries, frameworks and technologies remain
                  subject to their respective licenses.
                </p>
              </section>

              <section id="client-responsibilities">
                <h2>6. Client Responsibilities</h2>

                <p>
                  Clients are responsible for providing accurate information,
                  content, feedback and approvals required for successful
                  project completion.
                </p>

                <p>
                  Delays in providing required materials or feedback may affect
                  the overall project timeline.
                </p>
              </section>

              <section id="liability">
                <h2>7. Limitation of Liability</h2>

                <p>
                  While we make reasonable efforts to provide reliable services,
                  Indilens cannot guarantee that websites or digital services
                  will always be completely free from errors or interruptions.
                </p>
              </section>

              <section id="changes">
                <h2>8. Changes to These Terms</h2>

                <p>
                  We may update these Terms and Conditions from time to time.
                  Updated terms will be published on this page with a revised
                  update date.
                </p>
              </section>

              <section id="contact">
                <h2>9. Contact</h2>

                <p>
                  If you have questions about these Terms and Conditions, please
                  contact us through our Contact page.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;
