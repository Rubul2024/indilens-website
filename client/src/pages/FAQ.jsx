import { useState } from "react";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

import "./FAQ.css";

const FAQ = () => {
  /* ========================================
     STATE
  ======================================== */

  const [activeCategory, setActiveCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [openFAQ, setOpenFAQ] = useState(null);

  /* ========================================
     FAQ CATEGORIES
  ======================================== */

  const categories = [
    "All",
    "General",
    "Services",
    "Process",
    "Technology",
    "Support",
  ];

  /* ========================================
     FAQ DATA
  ======================================== */

  const faqs = [
    {
      id: 1,
      category: "General",
      question: "What does Indilens do?",
      answer:
        "Indilens helps businesses and organizations build modern digital experiences through website development, web applications, UI/UX design and digital solutions.",
    },

    {
      id: 2,
      category: "General",
      question: "Who can work with Indilens?",
      answer:
        "We work with startups, small businesses, growing companies, entrepreneurs and organizations that want to improve their digital presence or build a new digital product.",
    },

    {
      id: 3,
      category: "Services",
      question: "What services do you provide?",
      answer:
        "Our services include modern website development, full-stack web applications, e-commerce solutions, UI/UX design, website redesign and custom digital solutions.",
    },

    {
      id: 4,
      category: "Services",
      question: "Can you redesign an existing website?",
      answer:
        "Yes. We can redesign an existing website to improve its visual design, user experience, performance, responsiveness and overall digital presence.",
    },

    {
      id: 5,
      category: "Services",
      question: "Do you build custom web applications?",
      answer:
        "Yes. We can develop custom web applications based on your business requirements, workflows and specific functionality.",
    },

    {
      id: 6,
      category: "Process",
      question: "How does a project usually start?",
      answer:
        "We begin by understanding your goals, business requirements, target audience and project expectations. From there, we define the scope and recommend an appropriate approach.",
    },

    {
      id: 7,
      category: "Process",
      question: "How long does a project take?",
      answer:
        "The timeline depends on the project's size, complexity and requirements. A simple website may take less time, while a custom web application can require several development phases.",
    },

    {
      id: 8,
      category: "Process",
      question: "Will I be involved during development?",
      answer:
        "Yes. We believe in transparent collaboration. You can provide feedback during important stages of design and development so the final product stays aligned with your expectations.",
    },

    {
      id: 9,
      category: "Technology",
      question: "What technologies do you use?",
      answer:
        "We work with modern technologies including React, JavaScript, Node.js, Express.js, MongoDB and other tools depending on the specific needs of the project.",
    },

    {
      id: 10,
      category: "Technology",
      question: "Will my website be mobile responsive?",
      answer:
        "Yes. Our websites are designed to work across desktop, tablet and mobile devices to provide a consistent user experience.",
    },

    {
      id: 11,
      category: "Technology",
      question: "Can you integrate APIs and third-party services?",
      answer:
        "Yes. We can integrate APIs and third-party services when they are required for your project, such as payment systems, authentication services and other external platforms.",
    },

    {
      id: 12,
      category: "Support",
      question: "Do you provide support after launch?",
      answer:
        "Yes. Depending on the project and agreement, we can provide ongoing support, maintenance, improvements and technical assistance after launch.",
    },

    {
      id: 13,
      category: "Support",
      question: "Can I request future updates?",
      answer:
        "Yes. Websites and digital products often evolve over time. You can request new features, improvements and updates as your business grows.",
    },

    {
      id: 14,
      category: "Support",
      question: "How can I contact Indilens?",
      answer:
        "You can contact us through our Contact page. Share some information about your project and our team can review your requirements and get back to you.",
    },
  ];

  /* ========================================
     TOGGLE FAQ
  ======================================== */

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  /* ========================================
     FILTER FAQS
  ======================================== */

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="faq-page">
      {/* ========================================
          FAQ HERO
      ======================================== */}

      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero-content">
            <span className="section-label">Frequently Asked Questions</span>

            <h1>
              Answers to
              <span>Your Questions.</span>
            </h1>

            <p>
              Find answers to common questions about our services, process,
              technology and support.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ SECTION
      ======================================== */}

      <section className="faq-section section">
        <div className="container">
          <SectionTitle
            align="center"
            label="Need to Know?"
            title="We've got answers."
            description="Browse our frequently asked questions or search for a specific topic."
          />

          {/* ========================================
              SEARCH
          ======================================== */}

          <div className="faq-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);

                setOpenFAQ(null);
              }}
            />
          </div>

          {/* ========================================
              CATEGORY FILTERS
          ======================================== */}

          <div className="faq-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "faq-category active"
                    : "faq-category"
                }
                onClick={() => {
                  setActiveCategory(category);

                  setOpenFAQ(null);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ========================================
              FAQ LIST
          ======================================== */}

          {filteredFAQs.length > 0 ? (
            <div className="faq-list">
              {filteredFAQs.map((faq) => (
                <article
                  className={openFAQ === faq.id ? "faq-item open" : "faq-item"}
                  key={faq.id}
                >
                  {/* QUESTION */}

                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <span>{faq.question}</span>

                    <span className="faq-icon">
                      {openFAQ === faq.id ? "−" : "+"}
                    </span>
                  </button>

                  {/* ANSWER */}

                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* ========================================
                EMPTY STATE
            ======================================== */

            <div className="faq-empty">
              <span>No Results</span>

              <h3>We couldn't find an answer.</h3>

              <p>Try another search term or choose a different category.</p>

              <button
                onClick={() => {
                  setSearchTerm("");

                  setActiveCategory("All");

                  setOpenFAQ(null);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          STILL HAVE QUESTIONS
      ======================================== */}

      <section className="faq-contact-section">
        <div className="container">
          <div className="faq-contact-card">
            <div className="faq-contact-content">
              <span className="section-label">Still Have Questions?</span>

              <h2>Can't find what you're looking for?</h2>

              <p>
                Every project is different. If you have a question that isn't
                answered here, feel free to reach out to our team.
              </p>
            </div>

            <div className="faq-contact-action">
              <Button to="/contact">
                Contact Our Team
                <span>→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="faq-cta">
        <div className="container">
          <div className="faq-cta-content">
            <span className="section-label">Ready to Get Started?</span>

            <h2>
              Let's build something
              <br />
              meaningful together.
            </h2>

            <p>
              Tell us about your project and let's explore how we can help bring
              your ideas to life.
            </p>

            <Button to="/contact">
              Start Your Project
              <span>→</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
