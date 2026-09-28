import { Link } from "react-router-dom";

import Button from "../components/Button";
import SEO from "../components/SEO";

import "./NotFound.css";

const LINKS = [
  { to: "/services", label: "Our services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact us" },
];

const NotFound = () => (
  <main className="not-found">
    <SEO title="Page not found | Indilens" noIndex />

    <div className="container not-found-inner">
      <span className="not-found-code" aria-hidden="true">
        404
      </span>
      <h1>This page doesn't exist.</h1>
      <p>The link may be broken or the page may have moved. Here are some helpful places to continue:</p>

      <div className="not-found-actions">
        <Button to="/">
          Back to home
          <span>→</span>
        </Button>
      </div>

      <nav className="not-found-links" aria-label="Popular pages">
        {LINKS.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  </main>
);

export default NotFound;
