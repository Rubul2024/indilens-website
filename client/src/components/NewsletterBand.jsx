import NewsletterForm from "./NewsletterForm";

import "./NewsletterBand.css";

// Newsletter sign-up shown above the footer on every public page
const NewsletterBand = () => (
  <section className="newsletter-band" aria-labelledby="newsletter-band-title">
    <div className="container">
      <div className="newsletter-band-card">
        <div className="newsletter-band-text">
          <span className="newsletter-band-label">Newsletter</span>
          <h2 id="newsletter-band-title">Get useful digital insights in your inbox</h2>
          <p>Practical tips on websites, software and growing your business online. No spam.</p>
        </div>

        <NewsletterForm className="newsletter-band-form" showArrow />
      </div>
    </div>
  </section>
);

export default NewsletterBand;
