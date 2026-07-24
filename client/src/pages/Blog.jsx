import { useState } from "react";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

import "./Blog.css";

const Blog = () => {
  /* ========================================
     STATE
  ======================================== */

  const [activeCategory, setActiveCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  /* ========================================
     BLOG CATEGORIES
  ======================================== */

  const categories = [
    "All",
    "Web Development",
    "Design",
    "Technology",
    "Business",
  ];

  /* ========================================
     BLOG POSTS
  ======================================== */

  const posts = [
    {
      id: 1,
      title: "How Modern Websites Help Businesses Grow",
      category: "Web Development",
      date: "July 10, 2026",
      readTime: "6 min read",
      description:
        "Discover how a modern website can improve brand credibility, customer experience and business growth.",
      initials: "01",
      featured: true,
    },

    {
      id: 2,
      title: "Why User Experience Matters in Digital Products",
      category: "Design",
      date: "July 05, 2026",
      readTime: "5 min read",
      description:
        "A great digital product is not only about how it looks. Learn why usability and user experience are equally important.",
      initials: "02",
      featured: false,
    },

    {
      id: 3,
      title: "Choosing the Right Technology for Your Web Project",
      category: "Technology",
      date: "June 28, 2026",
      readTime: "7 min read",
      description:
        "Learn how to evaluate technologies and choose the right tools for building a scalable digital product.",
      initials: "03",
      featured: false,
    },

    {
      id: 4,
      title: "React vs Traditional Website Development",
      category: "Web Development",
      date: "June 20, 2026",
      readTime: "8 min read",
      description:
        "Explore the differences between modern React applications and traditional website development approaches.",
      initials: "04",
      featured: false,
    },

    {
      id: 5,
      title: "Building a Strong Digital Brand",
      category: "Business",
      date: "June 15, 2026",
      readTime: "5 min read",
      description:
        "Your digital presence plays an important role in how customers perceive your business. Here's how to build it better.",
      initials: "05",
      featured: false,
    },

    {
      id: 6,
      title: "The Future of Web Development",
      category: "Technology",
      date: "June 08, 2026",
      readTime: "6 min read",
      description:
        "Explore emerging trends and technologies that are shaping the future of modern web development.",
      initials: "06",
      featured: false,
    },
  ];

  /* ========================================
     FILTER POSTS
  ======================================== */

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  /* ========================================
     FEATURED POST
  ======================================== */

  const featuredPost = posts.find((post) => post.featured);

  return (
    <main className="blog-page">
      {/* ========================================
          BLOG HERO
      ======================================== */}

      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <span className="section-label">Indilens Insights</span>

            <h1>
              Ideas, Insights
              <span>& Digital Thinking.</span>
            </h1>

            <p>
              Explore our thoughts on technology, design, web development and
              digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURED ARTICLE
      ======================================== */}

      <section className="featured-blog section">
        <div className="container">
          <div className="featured-blog-card">
            <div className="featured-blog-visual">
              <span>Featured Article</span>

              <strong>{featuredPost.initials}</strong>
            </div>

            <div className="featured-blog-content">
              <div className="blog-meta">
                <span>{featuredPost.category}</span>

                <span>{featuredPost.date}</span>
              </div>

              <h2>{featuredPost.title}</h2>

              <p>{featuredPost.description}</p>

              <div className="featured-blog-footer">
                <span>{featuredPost.readTime}</span>

                <Button to="/contact">
                  Discuss Your Project
                  <span>→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          BLOG LIST
      ======================================== */}

      <section className="blog-list section">
        <div className="container">
          <SectionTitle
            label="Latest Articles"
            title="Learn. Explore. Build."
            description="Practical insights and ideas to help you understand technology, design and the digital world."
          />

          {/* ========================================
              SEARCH
          ======================================== */}

          <div className="blog-controls">
            <div className="blog-search">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            {/* ========================================
                CATEGORY FILTER
            ======================================== */}

            <div className="blog-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? "blog-filter active"
                      : "blog-filter"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================
              ARTICLE GRID
          ======================================== */}

          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <article className="blog-card" key={post.id}>
                  {/* ARTICLE VISUAL */}

                  <div className="blog-card-visual">
                    <span>{post.category}</span>

                    <strong>{post.initials}</strong>
                  </div>

                  {/* ARTICLE CONTENT */}

                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span>{post.date}</span>

                      <span>{post.readTime}</span>
                    </div>

                    <h3>{post.title}</h3>

                    <p>{post.description}</p>

                    <button className="blog-read-more">
                      Read Article
                      <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* ========================================
                EMPTY STATE
            ======================================== */

            <div className="blog-empty">
              <span>No Results</span>

              <h3>We couldn't find any articles.</h3>

              <p>
                Try searching for another keyword or select a different
                category.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");

                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          NEWSLETTER
      ======================================== */}

  {/* ========================================
    NEWSLETTER
======================================== */}

<section className="blog-newsletter">

  <div className="container">

    <div className="newsletter-card">

      <div className="newsletter-content">

        <span className="section-label">
          Stay Updated
        </span>

        <h2>
          Get useful digital insights in your inbox.
        </h2>

        <p>
          Subscribe to receive useful articles, technology insights and
          updates from Indilens.
        </p>

      </div>


      {/* ========================================
          NEWSLETTER FORM
      ======================================== */}

      <form
        className="newsletter-form"
        onSubmit={async (event) => {

          event.preventDefault();

          const emailInput =
            event.target.elements.email;

          const email =
            emailInput.value.trim();


          // ========================================
          // CHECK EMAIL
          // ========================================

          if (!email) {
            alert("Please enter your email address.");
            return;
          }


          try {

            // ========================================
            // SEND EMAIL TO BACKEND
            // ========================================

            const response = await fetch(
              "http://localhost:5000/api/newsletter",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  email: email,
                }),
              }
            );


            const data =
              await response.json();


            // ========================================
            // SUCCESS
            // ========================================

            if (response.ok) {

              alert(
                "Successfully subscribed to our newsletter!"
              );

              emailInput.value = "";

            }


            // ========================================
            // BACKEND ERROR
            // ========================================

            else {

              alert(
                data.message ||
                "Subscription failed. Please try again."
              );

            }

          }


          // ========================================
          // NETWORK ERROR
          // ========================================

          catch (error) {

            console.error(
              "Newsletter Error:",
              error
            );

            alert(
              "Unable to connect to the server. Please try again later."
            );

          }

        }}
      >

        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
        />

        <button type="submit">
          Subscribe
        </button>

      </form>

    </div>

  </div>

</section>

      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="blog-cta">
        <div className="container">
          <div className="blog-cta-content">
            <span className="section-label">Have a Project?</span>

            <h2>
              Let's turn your idea
              <br />
              into something real.
            </h2>

            <p>
              Have a digital project in mind? Let's talk about your goals and
              explore how we can help.
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

export default Blog;
