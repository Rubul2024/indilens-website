import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../components/Button";
import SEO from "../components/SEO";
import usePublicData from "../hooks/usePublicData";
import { formatPostDate, isHeadingBlock, readingTime, toParagraphs } from "../utils/content";

import "./BlogPost.css";

const SITE_URL = "https://indilens.com";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, loading, error } = usePublicData(`/api/blog/${encodeURIComponent(slug)}`);
  const { data: allPosts } = usePublicData("/api/blog", []);
  const [imageFailed, setImageFailed] = useState(false);

  if (loading) {
    return (
      <main className="post-page">
        <div className="container post-container" aria-busy="true">
          <div className="post-skeleton post-skeleton--title" />
          <div className="post-skeleton" />
          <div className="post-skeleton" />
          <div className="post-skeleton post-skeleton--short" />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="post-page">
        <SEO title="Article not found | Indilens" noIndex />
        <div className="container post-container post-missing">
          <span className="section-label">404</span>
          <h1>Article not found</h1>
          <p>
            {error?.status === 404 || !error
              ? "This article may have been moved or is no longer available."
              : "We couldn't load this article right now. Please try again shortly."}
          </p>
          <Button to="/blog">
            Browse all articles
            <span>→</span>
          </Button>
        </div>
      </main>
    );
  }

  const published = post.publishedAt || post.createdAt;
  const blocks = toParagraphs(post.content);
  const hasImage = post.featuredImage && !imageFailed;
  const related = (allPosts || []).filter((item) => item.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: published,
    dateModified: post.updatedAt || published,
    author: { "@type": "Person", name: post.author || "Indilens" },
    publisher: {
      "@type": "Organization",
      name: "Indilens",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/indilens-logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.featuredImage ? { image: post.featuredImage } : {}),
  };

  return (
    <main className="post-page">
      <SEO
        title={`${post.title} | Indilens Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        type="article"
        {...(post.featuredImage ? { image: post.featuredImage } : {})}
        schema={schema}
      />

      <article>
        <header className="post-header">
          <div className="container post-container">
            <nav className="post-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/blog">Blog</Link>
            </nav>

            <span className="post-category">{post.category}</span>

            <h1>{post.title}</h1>

            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}

            <div className="post-meta">
              <span className="post-author-avatar" aria-hidden="true">
                {(post.author || "I").charAt(0).toUpperCase()}
              </span>
              <span>
                <strong>{post.author || "Indilens"}</strong>
                <small>
                  <time dateTime={published}>{formatPostDate(published)}</time> · {readingTime(post.content)}
                </small>
              </span>
            </div>
          </div>
        </header>

        {hasImage && (
          <div className="container post-cover-wrap">
            <img
              className="post-cover"
              src={post.featuredImage}
              alt=""
              onError={() => setImageFailed(true)}
            />
          </div>
        )}

        <div className="container post-container post-body">
          {blocks.map((block, index) =>
            isHeadingBlock(block) && index > 0 ? (
              <h2 key={index}>{block}</h2>
            ) : (
              <p key={index}>{block}</p>
            )
          )}
        </div>

        <div className="container post-container">
          <div className="post-cta">
            <div>
              <h2>Have a project in mind?</h2>
              <p>Let's talk about how Indilens can help your business grow online.</p>
            </div>
            <Button to="/contact">
              Start a Conversation
              <span>→</span>
            </Button>
          </div>

          <Link to="/blog" className="post-back">
            <span aria-hidden="true">←</span> Back to all articles
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="post-related">
          <div className="container">
            <h2>More from the blog</h2>

            <div className="post-related-grid">
              {related.map((item) => (
                <Link key={item._id} to={`/blog/${item.slug}`} className="post-related-card">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <small>{formatPostDate(item.publishedAt || item.createdAt)}</small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPost;
