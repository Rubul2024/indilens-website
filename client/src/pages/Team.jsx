import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

import "./Team.css";

const Team = () => {
  /* ========================================
     LEADERSHIP TEAM
  ======================================== */

  const leadership = [
    {
      id: 1,
      name: "Founder & Director",
      role: "Leadership",
      description:
        "Focused on building meaningful digital solutions, defining product strategy and creating long-term value for clients.",
      initials: "FD",
    },

    {
      id: 2,
      name: "Technology Lead",
      role: "Technology",
      description:
        "Focused on modern web technologies, scalable architecture and building reliable digital products.",
      initials: "TL",
    },
  ];

  /* ========================================
     CORE TEAM
  ======================================== */

  const teamMembers = [
    {
      id: 1,
      name: "Frontend Developer",
      role: "Development",
      description:
        "Creates responsive, interactive and user-focused digital experiences using modern frontend technologies.",
      initials: "FE",
    },

    {
      id: 2,
      name: "Backend Developer",
      role: "Development",
      description:
        "Builds secure APIs, database systems and scalable backend architectures for modern web applications.",
      initials: "BE",
    },

    {
      id: 3,
      name: "UI/UX Designer",
      role: "Design",
      description:
        "Transforms ideas into intuitive interfaces and thoughtful user experiences that people enjoy using.",
      initials: "UX",
    },

    {
      id: 4,
      name: "Project Manager",
      role: "Strategy",
      description:
        "Keeps projects organized, collaborative and aligned with business goals from planning to delivery.",
      initials: "PM",
    },
  ];

  /* ========================================
     CULTURE VALUES
  ======================================== */

  const values = [
    {
      number: "01",
      title: "Think Clearly",
      description:
        "We believe good digital products start with a clear understanding of the problem.",
    },

    {
      number: "02",
      title: "Build Better",
      description:
        "We continuously improve our processes, technologies and solutions.",
    },

    {
      number: "03",
      title: "Stay Curious",
      description:
        "We learn, experiment and explore new ideas to keep moving forward.",
    },

    {
      number: "04",
      title: "Work Together",
      description:
        "We believe the best results come from open communication and collaboration.",
    },
  ];

  /* ========================================
     COLLABORATION PROCESS
  ======================================== */

  const collaboration = [
    {
      number: "01",
      title: "Listen",
      description:
        "We listen carefully to understand your needs, challenges and expectations.",
    },

    {
      number: "02",
      title: "Think",
      description:
        "We analyze the problem and explore the best possible approach.",
    },

    {
      number: "03",
      title: "Create",
      description:
        "We work together to design and develop a solution that delivers real value.",
    },

    {
      number: "04",
      title: "Grow",
      description:
        "We continue to improve and evolve the product as your business grows.",
    },
  ];

  return (
    <main className="team-page">
      {/* ========================================
          TEAM HERO
      ======================================== */}

      <section className="team-hero">
        <div className="container">
          <div className="team-hero-content">
            <span className="section-label">Our Team</span>

            <h1>
              People Behind
              <span>Digital Experiences.</span>
            </h1>

            <p>
              We are a team of designers, developers, strategists and problem
              solvers working together to create meaningful digital experiences.
            </p>

            <div className="team-hero-actions">
              <Button to="/contact">
                Work With Us
                <span>→</span>
              </Button>

              <Button to="/about" variant="outline">
                About Indilens
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          TEAM INTRODUCTION
      ======================================== */}

      <section className="team-intro section">
        <div className="container">
          <div className="team-intro-grid">
            <SectionTitle
              label="Who We Are"
              title="A team that combines creativity and technology."
              description="We bring together different skills, perspectives and experiences to create digital products that are useful, beautiful and built for real-world needs."
            />

            <div className="team-intro-content">
              <p>
                Great digital products are rarely created by one person. They
                are built through collaboration between people who understand
                design, technology, business and users.
              </p>

              <p>
                At Indilens, we believe in combining these perspectives to
                create solutions that are practical today and ready for
                tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          LEADERSHIP
      ======================================== */}

      <section className="leadership-section section">
        <div className="container">
          <SectionTitle
            align="center"
            label="Leadership"
            title="The people guiding the vision."
            description="Our leadership focuses on creating a strong foundation for technology, creativity and long-term growth."
          />

          <div className="leadership-grid">
            {leadership.map((member) => (
              <article className="leadership-card" key={member.id}>
                <div className="member-visual">
                  <div className="member-initials">{member.initials}</div>
                </div>

                <div className="member-content">
                  <span className="member-role">{member.role}</span>

                  <h3>{member.name}</h3>

                  <p>{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CORE TEAM
      ======================================== */}

      <section className="core-team-section section">
        <div className="container">
          <SectionTitle
            label="Our People"
            title="Different skills. One shared vision."
            description="Our team brings together technical expertise, creative thinking and strategic problem solving."
          />

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article className="team-card" key={member.id}>
                <div className="team-card-visual">
                  <div className="team-card-initials">{member.initials}</div>

                  <span className="team-card-number">0{member.id}</span>
                </div>

                <div className="team-card-content">
                  <span className="member-role">{member.role}</span>

                  <h3>{member.name}</h3>

                  <p>{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CULTURE
      ======================================== */}

      <section className="culture-section section">
        <div className="container">
          <div className="culture-header">
            <SectionTitle
              label="Our Culture"
              title="How we think, work and grow."
              description="Our culture shapes the way we approach problems, collaborate with each other and create solutions for our clients."
            />
          </div>

          <div className="values-grid">
            {values.map((value) => (
              <article className="value-card" key={value.number}>
                <span className="value-number">{value.number}</span>

                <h3>{value.title}</h3>

                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          COLLABORATION
      ======================================== */}

      <section className="collaboration-section section">
        <div className="container">
          <SectionTitle
            align="center"
            label="Working Together"
            title="Better collaboration creates better products."
            description="We believe in keeping communication open and making every stage of the project a collaborative experience."
          />

          <div className="collaboration-grid">
            {collaboration.map((item) => (
              <article className="collaboration-card" key={item.number}>
                <span>{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          WHY WORK WITH US
      ======================================== */}

      <section className="team-benefits-section">
        <div className="container">
          <div className="team-benefits-grid">
            <div className="team-benefits-content">
              <span className="section-label">Why Work With Us</span>

              <h2>
                A team that cares about
                <span>the details.</span>
              </h2>

              <p>
                We don't just focus on completing projects. We focus on
                understanding the bigger picture, solving the right problems and
                creating experiences that make a difference.
              </p>

              <Button to="/contact">
                Start a Conversation
                <span>→</span>
              </Button>
            </div>

            <div className="benefits-list">
              <div className="benefit-item">
                <strong>01</strong>

                <div>
                  <h3>Clear Communication</h3>

                  <p>
                    We keep communication simple, transparent and consistent.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <strong>02</strong>

                <div>
                  <h3>Modern Technology</h3>

                  <p>
                    We use modern tools and technologies to create reliable
                    digital solutions.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <strong>03</strong>

                <div>
                  <h3>Long-Term Thinking</h3>

                  <p>
                    We build solutions with scalability, maintainability and
                    future growth in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="team-cta">
        <div className="container">
          <div className="team-cta-content">
            <span className="section-label">Let's Work Together</span>

            <h2>
              Have an idea?
              <br />
              Let's build it together.
            </h2>

            <p>
              Whether you have a clear project plan or just an idea, our team is
              ready to listen, collaborate and help you move forward.
            </p>

            <Button to="/contact">
              Talk to Our Team
              <span>→</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;
