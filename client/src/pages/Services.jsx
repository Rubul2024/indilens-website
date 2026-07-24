import { Link } from "react-router-dom";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

import "./Services.css";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Web Development",
      description:
        "Modern, responsive and high-performance websites designed to represent your brand and help you achieve your business goals.",
      tags: ["Business Websites", "Corporate Websites", "Responsive Design"],
    },

    {
      number: "02",
      title: "MERN Stack Development",
      description:
        "Scalable full-stack web applications built using MongoDB, Express.js, React and Node.js.",
      tags: ["React", "Node.js", "Express.js", "MongoDB"],
    },

    {
      number: "03",
      title: "UI/UX Design",
      description:
        "User-focused interfaces and digital experiences that combine visual quality with usability and accessibility.",
      tags: ["User Experience", "Interface Design", "Design Systems"],
    },

    {
      number: "04",
      title: "Business Websites",
      description:
        "Professional websites built to establish credibility, communicate your value and convert visitors into customers.",
      tags: ["Corporate", "Startup", "Professional"],
    },

    {
      number: "05",
      title: "E-commerce Solutions",
      description:
        "Modern online stores designed to provide smooth shopping experiences and help businesses grow online.",
      tags: ["Online Stores", "Product Systems", "Payment Integration"],
    },

    {
      number: "06",
      title: "Digital Solutions",
      description:
        "Custom digital solutions designed around your unique business challenges, workflows and long-term objectives.",
      tags: ["Custom Solutions", "API Integration", "Automation"],
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discover",
      description:
        "We understand your business, audience, goals and project requirements.",
    },

    {
      number: "02",
      title: "Plan",
      description:
        "We define the structure, technology and strategy required to build the right solution.",
    },

    {
      number: "03",
      title: "Build",
      description:
        "We design and develop a modern, scalable and user-focused digital experience.",
    },

    {
      number: "04",
      title: "Launch & Improve",
      description:
        "We launch the solution and continue optimizing it for performance and long-term growth.",
    },
  ];

  const technologies = [
    "React",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST API",
    "HTML5",
    "CSS3",
  ];

  const faqs = [
    {
      question: "What type of websites do you build?",
      answer:
        "We build modern business websites, corporate websites, portfolio websites, e-commerce platforms and custom web applications.",
    },

    {
      question: "Do you build full-stack applications?",
      answer:
        "Yes. We can build full-stack applications using modern technologies such as React, Node.js, Express.js and MongoDB.",
    },

    {
      question: "Can you customize a solution for my business?",
      answer:
        "Yes. Every business has different requirements, so we focus on creating solutions that are aligned with your goals and audience.",
    },
  ];

  return (
    <main className="services-page">
      {/* ========================================
          SERVICES HERO
      ======================================== */}

      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <span className="section-label">Our Services</span>

            <h1>
              Digital Solutions
              <span>Built for Growth.</span>
            </h1>

            <p>
              From professional websites to full-stack applications, we create
              modern digital solutions that help businesses build, grow and
              succeed online.
            </p>

            <div className="services-hero-actions">
              <Button to="/contact">
                Start Your Project
                <span>→</span>
              </Button>

              <Button to="/portfolio" variant="outline">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SERVICES INTRO
      ======================================== */}
    

      <section className="services-intro section">
        <div className="container">
          <div className="services-intro-grid">
            {/* LEFT SIDE */}

            <div className="services-intro-content">
              <SectionTitle
                label="What We Do"
                title="Technology, design and strategy working together."
                description="We combine creative thinking, modern technology and user-focused design to create digital experiences that solve real business problems."
              />

              <p>
                A successful digital product requires more than just attractive
                visuals. It needs a clear strategy, thoughtful user experience
                and reliable technology.
              </p>

              <p>
                Our approach brings these elements together to create digital
                solutions that are practical, scalable and ready for the future.
              </p>
            </div>

            {/* RIGHT SIDE */}

            <div className="services-intro-card">
              <div className="services-card-number">01</div>

              <h3>Digital solutions built around your goals.</h3>

              <p>
                We bring strategy, design and modern technology together to
                create digital experiences that help businesses build trust,
                connect with their audience and grow online.
              </p>

              <Link to="/contact">
                Start Your Project
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ========================================
          MAIN SERVICES
      ======================================== */}

      <section className="main-services section">
        <div className="container">
          <SectionTitle
            align="center"
            label="Our Expertise"
            title="Services designed around your goals."
            description="Choose the right combination of technology, design and digital expertise for your business."
          />

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>

                  <span className="service-arrow">↗</span>
                </div>

                <div className="service-card-content">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
                </div>

                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          PROCESS
      ======================================== */}

      <section className="process-section section">
        <div className="container">
          <SectionTitle
            label="Our Process"
            title="From idea to digital product."
            description="Our process is designed to keep projects clear, collaborative and focused on delivering meaningful results."
          />

          <div className="process-grid">
            {process.map((item) => (
              <article className="process-card" key={item.number}>
                <span className="process-number">{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          TECHNOLOGY
      ======================================== */}

      <section className="technology-section section">
        <div className="container">
          <div className="technology-grid">
            <div>
              <SectionTitle
                label="Technology"
                title="Built with modern technology."
                description="We use reliable and modern technologies to build digital products that are fast, scalable and maintainable."
              />

              <Button to="/contact">
                Discuss Your Project
                <span>→</span>
              </Button>
            </div>

            <div className="technology-list">
              {technologies.map((technology) => (
                <div className="technology-item" key={technology}>
                  <span>{technology}</span>

                  <span>→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ PREVIEW
      ======================================== */}

      <section className="services-faq section">
        <div className="container">
          <div className="services-faq-header">
            <SectionTitle
              align="center"
              label="FAQ"
              title="Questions about our services?"
              description="Here are some common questions about the digital solutions we provide."
            />
          </div>

          <div className="services-faq-list">
            {faqs.map((faq, index) => (
              <details className="services-faq-item" key={index}>
                <summary>
                  <span>{faq.question}</span>

                  <span className="faq-icon">+</span>
                </summary>

                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="services-faq-link">
            <Link to="/faq">
              View All Frequently Asked Questions
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="services-cta">
        <div className="container">
          <div className="services-cta-content">
            <span className="section-label">Start Your Project</span>

            <h2>
              Have a digital idea?
              <br />
              Let's build it together.
            </h2>

            <p>
              Tell us about your business, your goals and what you want to
              build. Let's explore how we can turn your idea into a meaningful
              digital experience.
            </p>

            <Button to="/contact">
              Let's Talk
              <span>→</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
