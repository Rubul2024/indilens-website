import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
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
              Privacy
              <span>Policy</span>
            </h1>

            <p>
              Your privacy matters to us. This Privacy Policy explains how
              Indilens collects, uses and protects information when you use our
              website and services.
            </p>

            <span className="legal-updated">Last Updated: July 2026</span>
          </div>
        </div>
      </section>

      {/* ========================================
          PRIVACY CONTENT
      ======================================== */}

      <section className="legal-content-section">
        <div className="container">
          <div className="legal-layout">
            {/* ========================================
                SIDEBAR
            ======================================== */}

            <aside className="legal-sidebar">
              <span>On This Page</span>

              <a href="#introduction">Introduction</a>

              <a href="#information">Information We Collect</a>

              <a href="#usage">How We Use Information</a>

              <a href="#cookies">Cookies</a>

              <a href="#security">Data Security</a>

              <a href="#third-party">Third-Party Services</a>

              <a href="#rights">Your Rights</a>

              <a href="#contact">Contact Us</a>
            </aside>

            {/* ========================================
                MAIN CONTENT
            ======================================== */}

            <article className="legal-content">
              <section id="introduction">
                <h2>1. Introduction</h2>

                <p>
                  Welcome to Indilens. We respect your privacy and are committed
                  to protecting the personal information you may provide when
                  using our website or contacting us.
                </p>

                <p>
                  This Privacy Policy describes the types of information we may
                  collect, how we use that information and the steps we take to
                  protect it.
                </p>
              </section>

              <section id="information">
                <h2>2. Information We Collect</h2>

                <p>
                  We may collect information that you voluntarily provide when
                  you interact with our website.
                </p>

                <h3>Information may include:</h3>

                <ul>
                  <li>Your name</li>

                  <li>Email address</li>

                  <li>Phone number</li>

                  <li>Company information</li>

                  <li>Project requirements</li>

                  <li>Other information you choose to provide</li>
                </ul>
              </section>

              <section id="usage">
                <h2>3. How We Use Information</h2>

                <p>We may use the information you provide to:</p>

                <ul>
                  <li>Respond to your enquiries</li>

                  <li>Understand your project requirements</li>

                  <li>Provide requested services</li>

                  <li>Improve our website and services</li>

                  <li>Communicate with you about relevant enquiries</li>
                </ul>
              </section>

              <section id="cookies">
                <h2>4. Cookies</h2>

                <p>
                  Our website may use cookies and similar technologies to
                  improve website functionality and understand how visitors
                  interact with our website.
                </p>

                <p>
                  You may be able to control cookies through your browser
                  settings.
                </p>
              </section>

              <section id="security">
                <h2>5. Data Security</h2>

                <p>
                  We take reasonable measures to protect information submitted
                  through our website. However, no method of electronic
                  transmission or storage can be guaranteed to be completely
                  secure.
                </p>
              </section>

              <section id="third-party">
                <h2>6. Third-Party Services</h2>

                <p>
                  Our website may use third-party services or tools that have
                  their own privacy policies. We encourage you to review the
                  privacy policies of those services when appropriate.
                </p>
              </section>

              <section id="rights">
                <h2>7. Your Rights</h2>

                <p>
                  Depending on applicable laws, you may have rights regarding
                  your personal information, including the ability to request
                  access, correction or deletion of certain information.
                </p>
              </section>

              <section id="contact">
                <h2>8. Contact Us</h2>

                <p>
                  If you have questions about this Privacy Policy or how your
                  information is handled, please contact us through our Contact
                  page.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
