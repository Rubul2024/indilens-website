import { useState } from "react";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

import "./Portfolio.css";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Websites", "Web Apps", "E-commerce", "UI/UX"];

  const projects = [
    {
      id: 1,
      title: "Business Growth Platform",
      category: "Websites",
      type: "Corporate Website",
      description:
        "A modern corporate website designed to establish a strong digital presence and communicate the company's services clearly.",
      tags: ["React", "Responsive", "Business"],
    },

    {
      id: 2,
      title: "Digital Management System",
      category: "Web Apps",
      type: "Web Application",
      description:
        "A scalable web application designed to simplify business workflows and provide an efficient digital management experience.",
      tags: ["MERN", "Dashboard", "API"],
    },

    {
      id: 3,
      title: "Modern Online Store",
      category: "E-commerce",
      type: "E-commerce Platform",
      description:
        "A clean and user-friendly online shopping experience designed to help businesses showcase products and increase online sales.",
      tags: ["E-commerce", "React", "Payments"],
    },

    {
      id: 4,
      title: "Creative Brand Experience",
      category: "UI/UX",
      type: "UI/UX Design",
      description:
        "A modern user interface and experience designed around clarity, usability and a strong visual identity.",
      tags: ["UI Design", "UX Research", "Prototype"],
    },

    {
      id: 5,
      title: "Startup Launch Website",
      category: "Websites",
      type: "Startup Website",
      description:
        "A conversion-focused website designed to help a growing startup communicate its vision and connect with its target audience.",
      tags: ["Startup", "React", "Landing Page"],
    },

    {
      id: 6,
      title: "Business Operations App",
      category: "Web Apps",
      type: "Full-Stack Application",
      description:
        "A full-stack digital platform designed to help businesses manage operations, data and internal workflows.",
      tags: ["Node.js", "MongoDB", "React"],
    },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const process = [
    {
      number: "01",
      title: "Understand",
      text: "We start by understanding the project goals, audience and business requirements.",
    },

    {
      number: "02",
      title: "Design",
      text: "We create a clear visual direction and user experience focused on usability.",
    },

    {
      number: "03",
      title: "Develop",
      text: "We transform the approved design into a modern, responsive and scalable product.",
    },

    {
      number: "04",
      title: "Deliver",
      text: "We test, optimize and prepare the project for a successful launch.",
    },
  ];

  return (
    <main className="portfolio-page">
      {/* ========================================
          PORTFOLIO HERO
      ======================================== */}

      <section className="portfolio-hero">
        <div className="container">
          <div className="portfolio-hero-content">
            <span className="section-label">Our Portfolio</span>

            <h1>
              Work That
              <span>Creates Impact.</span>
            </h1>

            <p>
              Explore a selection of digital experiences, websites and
              applications designed to solve real business challenges and create
              meaningful results.
            </p>

            <div className="portfolio-hero-actions">
              <Button to="/contact">
                Start Your Project
                <span>→</span>
              </Button>

              <Button to="/services" variant="outline">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PORTFOLIO PROJECTS
      ======================================== */}

      <section className="portfolio-projects section">
        <div className="container">
          <SectionTitle
            align="center"
            label="Selected Work"
            title="Digital products built with purpose."
            description="Browse our selected projects and explore how thoughtful design and modern technology can create better digital experiences."
          />

          {/* FILTER */}

          <div className="portfolio-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "portfolio-filter active"
                    : "portfolio-filter"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PROJECT GRID */}

          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <article className="portfolio-card" key={project.id}>
                {/* PROJECT VISUAL */}

                <div className="portfolio-card-image">
                  <div className="project-placeholder">
                    <span>{project.category}</span>

                    <strong>{project.id.toString().padStart(2, "0")}</strong>
                  </div>
                </div>

                {/* PROJECT CONTENT */}

                <div className="portfolio-card-content">
                  <div className="portfolio-card-meta">
                    <span>{project.type}</span>

                    <span>↗</span>
                  </div>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="portfolio-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* EMPTY STATE */}

          {filteredProjects.length === 0 && (
            <div className="portfolio-empty">
              <h3>No projects found.</h3>

              <p>Please select another category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          PROJECT STATISTICS
      ======================================== */}

      <section className="portfolio-stats">
        <div className="container">
          <div className="portfolio-stats-grid">
            <div className="portfolio-stat">
              <strong>50+</strong>

              <span>Digital Projects</span>
            </div>

            <div className="portfolio-stat">
              <strong>30+</strong>

              <span>Happy Clients</span>
            </div>

            <div className="portfolio-stat">
              <strong>5+</strong>

              <span>Years Experience</span>
            </div>

            <div className="portfolio-stat">
              <strong>100%</strong>

              <span>Commitment</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          OUR PROCESS
      ======================================== */}

      <section className="portfolio-process section">
        <div className="container">
          <SectionTitle
            label="How We Work"
            title="From idea to successful launch."
            description="Every project follows a structured process that keeps the work focused, transparent and aligned with your goals."
          />

          <div className="portfolio-process-grid">
            {process.map((item) => (
              <article className="portfolio-process-card" key={item.number}>
                <span>{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="portfolio-cta">
        <div className="container">
          <div className="portfolio-cta-content">
            <span className="section-label">Have a Project in Mind?</span>

            <h2>
              Let's create something
              <br />
              remarkable together.
            </h2>

            <p>
              Tell us what you're planning and let's explore how we can turn
              your idea into a powerful digital experience.
            </p>

            <Button to="/contact">
              Start a Conversation
              <span>→</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
