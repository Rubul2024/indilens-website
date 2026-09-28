import { Link } from "react-router-dom";

import Icon from "../components/Icon";
import { Badge, EmptyState, ErrorState, PageHeader, Spinner } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { dashboardApi } from "../lib/api";
import { formatDate } from "../lib/format";
import useApiData from "../lib/useApiData";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const STATUS_TONE = { new: "info", read: "neutral", replied: "success" };

const DashboardPage = () => {
  const { admin } = useAuth();
  const { data, loading, error, reload } = useApiData(dashboardApi.overview);

  if (loading && !data) return <Spinner label="Loading dashboard…" />;
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;

  const { summary, published, recent } = data;

  const stats = [
    {
      label: "Messages",
      value: summary.totalContacts,
      note: summary.newContacts ? `${summary.newContacts} unread` : "All caught up",
      icon: "mail",
      to: "/admin/contacts",
      tone: "blue",
    },
    {
      label: "Subscribers",
      value: summary.totalNewsletterSubscribers,
      note: `${summary.activeNewsletterSubscribers ?? summary.totalNewsletterSubscribers} active`,
      icon: "send",
      to: "/admin/newsletter",
      tone: "cyan",
    },
    {
      label: "Blog Posts",
      value: summary.totalBlogs,
      note: `${published.publishedBlogs} published`,
      icon: "blog",
      to: "/admin/blogs",
      tone: "violet",
    },
    {
      label: "Portfolio",
      value: summary.totalPortfolioProjects,
      note: `${published.publishedPortfolioProjects} published`,
      icon: "briefcase",
      to: "/admin/portfolio",
      tone: "amber",
    },
  ];

  const content = [
    { label: "Blog posts", total: summary.totalBlogs, live: published.publishedBlogs, to: "/admin/blogs" },
    { label: "Services", total: summary.totalServices, live: published.publishedServices, to: "/admin/services" },
    { label: "Portfolio", total: summary.totalPortfolioProjects, live: published.publishedPortfolioProjects, to: "/admin/portfolio" },
    { label: "FAQs", total: summary.totalFAQs, live: published.publishedFAQs, to: "/admin/faq" },
    { label: "Team members", total: summary.totalTeamMembers, live: published.publishedTeamMembers, to: "/admin/team" },
  ];

  return (
    <>
      <PageHeader
        title={`${greeting()}, ${admin?.name?.split(" ")[0] || "Admin"}`}
        description="Here's what's happening across the Indilens website."
      >
        <button type="button" className="adm-btn adm-btn--secondary" onClick={reload} disabled={loading}>
          <Icon name="refresh" size={16} /> Refresh
        </button>
        <Link to="/admin/blogs/new" className="adm-btn adm-btn--primary">
          <Icon name="plus" size={16} /> New post
        </Link>
      </PageHeader>

      <section className="adm-stats">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to} className={`adm-stat adm-stat--${stat.tone}`}>
            <span className="adm-stat-icon">
              <Icon name={stat.icon} size={20} />
            </span>
            <span className="adm-stat-label">{stat.label}</span>
            <strong className="adm-stat-value">{stat.value}</strong>
            <span className="adm-stat-note">{stat.note}</span>
          </Link>
        ))}
      </section>

      <div className="adm-grid-2">
        <section className="adm-card">
          <div className="adm-card-header">
            <h2>Recent messages</h2>
            <Link to="/admin/contacts" className="adm-link">
              View all <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          {recent.contacts.length === 0 ? (
            <EmptyState icon="inbox" title="No messages yet" text="Enquiries from the contact form will appear here." />
          ) : (
            <ul className="adm-list">
              {recent.contacts.map((contact) => (
                <li key={contact._id}>
                  <Link to="/admin/contacts" state={{ open: contact._id }} className="adm-list-row">
                    <span className="adm-avatar adm-avatar--soft">{contact.name?.[0]?.toUpperCase() || "?"}</span>
                    <span className="adm-list-main">
                      <strong>{contact.name}</strong>
                      <small>{contact.subject || contact.email}</small>
                    </span>
                    <span className="adm-list-meta">
                      <Badge tone={STATUS_TONE[contact.status]}>{contact.status}</Badge>
                      <small>{formatDate(contact.createdAt)}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-card">
          <div className="adm-card-header">
            <h2>Content status</h2>
          </div>

          <ul className="adm-progress-list">
            {content.map((item) => {
              const percent = item.total ? Math.round((item.live / item.total) * 100) : 0;

              return (
                <li key={item.label}>
                  <Link to={item.to}>
                    <span className="adm-progress-label">
                      <span>{item.label}</span>
                      <span className="adm-muted">
                        {item.live} of {item.total} live
                      </span>
                    </span>
                    <span className="adm-progress" aria-hidden="true">
                      <span style={{ width: `${percent}%` }} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="adm-grid-2">
        <section className="adm-card">
          <div className="adm-card-header">
            <h2>Latest blog posts</h2>
            <Link to="/admin/blogs" className="adm-link">
              Manage <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          {recent.blogs.length === 0 ? (
            <EmptyState icon="blog" title="No posts yet" text="Create your first article to get started." />
          ) : (
            <ul className="adm-list">
              {recent.blogs.map((blog) => (
                <li key={blog._id}>
                  <Link to={`/admin/blogs/${blog._id}/edit`} className="adm-list-row">
                    <span className="adm-list-main">
                      <strong>{blog.title}</strong>
                      <small>{blog.category}</small>
                    </span>
                    <span className="adm-list-meta">
                      <Badge tone={blog.isPublished ? "success" : "warning"}>
                        {blog.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <small>{formatDate(blog.createdAt)}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-card">
          <div className="adm-card-header">
            <h2>New subscribers</h2>
            <Link to="/admin/newsletter" className="adm-link">
              View all <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          {recent.subscribers.length === 0 ? (
            <EmptyState icon="send" title="No subscribers yet" text="Newsletter sign-ups will appear here." />
          ) : (
            <ul className="adm-list">
              {recent.subscribers.map((subscriber) => (
                <li key={subscriber._id} className="adm-list-row">
                  <span className="adm-list-main">
                    <strong>{subscriber.email}</strong>
                  </span>
                  <span className="adm-list-meta">
                    <Badge tone={subscriber.isActive ? "success" : "neutral"}>
                      {subscriber.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <small>{formatDate(subscriber.createdAt)}</small>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
