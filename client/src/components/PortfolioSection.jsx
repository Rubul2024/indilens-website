import { Link } from "react-router-dom";

import "./PortfolioSection.css";

const PortfolioSection = () => {
  const projects = [
    {
      number: "01",
      category: "Web Development",
      title: "Modern Business Website",
      description:
        "A professional digital experience designed to help a growing business establish a stronger online presence.",
      technologies: ["React", "Node.js", "MongoDB"],
      className: "portfolio-project-one",
    },

    {
      number: "02",
      category: "MERN Application",
      title: "Business Management Platform",
      description:
        "A scalable web application designed to simplify business operations and provide a seamless user experience.",
      technologies: ["React", "Express", "MongoDB"],
      className: "portfolio-project-two",
    },

    {
      number: "03",
      category: "UI/UX Design",
      title: "Digital Product Experience",
      description:
        "A thoughtful interface and user experience created to make complex digital products easier to understand and use.",
      technologies: ["UI/UX", "Figma", "React"],
      className: "portfolio-project-three",
    },
  ];

  return (
    <section className="portfolio-section">
      <div className="container">
        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className="portfolio-header">
          <div className="portfolio-heading">
            <span className="portfolio-eyebrow">SELECTED WORK</span>

            <h2 className="portfolio-title">
              Work that turns
              <span>ideas into impact.</span>
            </h2>
          </div>

          <div className="portfolio-intro">
            <p>
              Explore a selection of digital experiences and solutions designed
              to solve real business challenges.
            </p>

            <Link to="/portfolio" className="portfolio-view-link">
              View All Projects
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ========================================
            PROJECTS
        ======================================== */}

        <div className="portfolio-projects">
          {projects.map((project) => (
            <article
              className={`portfolio-project ${project.className}`}
              key={project.number}
            >
              {/* ========================================
                  PROJECT VISUAL
              ======================================== */}

              <div className="portfolio-visual">
                <span className="portfolio-large-number">{project.number}</span>

                <div className="portfolio-visual-shape">
                  <span>↗</span>
                </div>
              </div>

              {/* ========================================
                  PROJECT CONTENT
              ======================================== */}

              <div className="portfolio-content">
                <div className="portfolio-project-top">
                  <span className="portfolio-project-number">
                    {project.number}
                  </span>

                  <span className="portfolio-category">{project.category}</span>
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                {/* ========================================
                    TECHNOLOGIES
                ======================================== */}

                <div className="portfolio-technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                {/* ========================================
                    PROJECT LINK
                ======================================== */}

                <Link to="/portfolio" className="portfolio-project-link">
                  View Project
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
