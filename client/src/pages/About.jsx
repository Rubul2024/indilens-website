import { Link } from "react-router-dom";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

import "./About.css";

const About = () => {
  const values = [
    {
      number: "01",
      title: "Innovation",
      text: "We continuously explore modern technologies and creative approaches to build better digital experiences.",
    },
    {
      number: "02",
      title: "Quality",
      text: "We focus on building reliable, scalable and high-quality digital solutions that create long-term value.",
    },
    {
      number: "03",
      title: "Transparency",
      text: "We believe in clear communication, honest collaboration and building strong relationships with our clients.",
    },
    {
      number: "04",
      title: "Growth",
      text: "Our goal is to create digital solutions that help businesses grow, adapt and compete in a rapidly changing world.",
    },
  ];

  const approach = [
    {
      number: "01",
      title: "Understand",
      text: "We first understand your business, audience, goals and challenges.",
    },
    {
      number: "02",
      title: "Strategize",
      text: "We create a clear digital strategy based on your specific requirements.",
    },
    {
      number: "03",
      title: "Build",
      text: "Our team transforms ideas into modern, functional and scalable digital experiences.",
    },
    {
      number: "04",
      title: "Improve",
      text: "We continuously analyze, optimize and improve digital products for long-term growth.",
    },
  ];

  const reasons = [
    "Modern and user-focused digital experiences",
    "Scalable technology and development practices",
    "Clean, professional and conversion-focused design",
    "Transparent communication and collaboration",
    "Solutions designed for long-term business growth",
    "A practical approach focused on measurable outcomes",
  ];

  return (
    <main className="about-page">
      {/* ========================================
          ABOUT HERO
      ======================================== */}

      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="section-label">About Indilens</span>

            <h1>
              We Build Digital
              <span> Experiences That Matter.</span>
            </h1>

            <p>
              Indilens is a digital solutions and web development company
              focused on helping businesses build strong, modern and meaningful
              digital experiences.
            </p>

            <div className="about-hero-actions">
              <Button to="/contact">
                Start a Conversation
                <span>→</span>
              </Button>

              <Button to="/services" variant="outline">
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          WHO WE ARE
      ======================================== */}

      <section className="about-intro section">
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-intro-content">
              <SectionTitle
                label="Who We Are"
                title="A digital partner for ambitious businesses."
                description="We combine strategy, design and technology to help businesses create digital experiences that are useful, engaging and built for growth."
              />

              <p>
                In today's digital-first world, having an online presence is no
                longer enough. Businesses need digital experiences that connect
                with people, communicate value and create meaningful results.
              </p>

              <p>
                At Indilens, we focus on creating modern websites and digital
                solutions that balance beautiful design with practical
                functionality.
              </p>
            </div>

            <div className="about-intro-card">
              <div className="about-card-number">01</div>

              <h3>Digital Thinking.</h3>

              <p>
                We think beyond websites. We focus on creating digital
                foundations that support your brand, customers and long-term
                business goals.
              </p>

              <Link to="/contact">
                Let's Work Together
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          MISSION & VISION
      ======================================== */}

      <section className="mission-section section">
        <div className="container">
          <SectionTitle
            align="center"
            label="Our Purpose"
            title="Building digital experiences with purpose."
            description="Our mission and vision guide how we think, design and build every digital solution."
          />

          <div className="mission-grid">
            <article className="mission-card">
              <span className="mission-number">01</span>

              <h3>Our Mission</h3>

              <p>
                To help businesses and organizations create modern digital
                experiences that are accessible, useful and designed to create
                real value.
              </p>
            </article>

            <article className="mission-card featured">
              <span className="mission-number">02</span>

              <h3>Our Vision</h3>

              <p>
                To become a trusted digital technology partner for businesses
                looking to build, transform and grow in the digital world.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================
          CORE VALUES
      ======================================== */}

      <section className="values-section section">
        <div className="container">
          <SectionTitle
            label="Our Values"
            title="Principles that shape our work."
            description="Every project we work on is guided by a simple set of principles that help us deliver meaningful results."
          />

          <div className="values-grid">
            {values.map((value) => (
              <article className="value-card" key={value.number}>
                <span className="value-number">{value.number}</span>

                <h3>{value.title}</h3>

                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          OUR APPROACH
      ======================================== */}

      <section className="approach-section section">
        <div className="container">
          <div className="approach-header">
            <SectionTitle
              label="Our Approach"
              title="A simple process. A thoughtful approach."
              description="We believe great digital products are built through collaboration, clarity and continuous improvement."
            />
          </div>

          <div className="approach-grid">
            {approach.map((item) => (
              <article className="approach-card" key={item.number}>
                <span className="approach-number">{item.number}</span>

                <div>
                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          WHY CHOOSE INDILENS
      ======================================== */}

      <section className="why-about-section section">
        <div className="container">
          <div className="why-about-grid">
            <div>
              <SectionTitle
                label="Why Indilens"
                title="More than a service provider. A digital partner."
                description="We work closely with our clients to understand their goals and create digital solutions that support long-term success."
              />

              <Button to="/contact">
                Work With Us
                <span>→</span>
              </Button>
            </div>

            <div className="reasons-list">
              {reasons.map((reason, index) => (
                <div className="reason-item" key={index}>
                  <span className="reason-check">✓</span>

                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <span className="section-label">Let's Build Something Great</span>

            <h2>
              Have an idea?
              <br />
              Let's turn it into reality.
            </h2>

            <p>
              Whether you're launching a new business, improving an existing
              website or planning a digital transformation, we're ready to help.
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

export default About;
