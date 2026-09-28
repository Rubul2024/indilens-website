import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { initials } from "../lib/format";
import { RESOURCE_LIST } from "../resources";
import Icon from "./Icon";

const NAV = [
  {
    heading: "Overview",
    items: [{ to: "/admin/dashboard", label: "Dashboard", icon: "dashboard" }],
  },
  {
    heading: "Inbox",
    items: [
      { to: "/admin/contacts", label: "Messages", icon: "mail" },
      { to: "/admin/newsletter", label: "Subscribers", icon: "send" },
    ],
  },
  {
    heading: "Content",
    items: RESOURCE_LIST.map((resource) => ({
      to: `/admin/${resource.key}`,
      label: resource.label,
      icon: resource.icon,
    })),
  },
  {
    heading: "Account",
    items: [{ to: "/admin/settings", label: "Settings", icon: "settings" }],
  },
];

const ALL_ITEMS = NAV.flatMap((group) => group.items);

const AdminLayout = () => {
  const { admin, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = ALL_ITEMS.find((item) => location.pathname.startsWith(item.to));

  useEffect(() => {
    document.title = `${current?.label || "Admin"} | Indilens Admin`;
  }, [current]);

  return (
    <div className={`adm-shell ${sidebarOpen ? "is-sidebar-open" : ""}`}>
      <aside className="adm-sidebar" aria-label="Admin navigation">
        <div className="adm-brand">
          <img src="/images/indilens-logo.png" alt="Indilens" />
          <span>Admin</span>
          <button
            type="button"
            className="adm-icon-btn adm-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav className="adm-nav">
          {NAV.map((group) => (
            <div key={group.heading} className="adm-nav-group">
              <span className="adm-nav-heading">{group.heading}</span>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `adm-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <a className="adm-nav-link" href="/" target="_blank" rel="noopener noreferrer">
            <Icon name="external" />
            <span>View website</span>
          </a>
          <button type="button" className="adm-nav-link" onClick={() => signOut()}>
            <Icon name="logout" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="adm-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />

      <div className="adm-main">
        <header className="adm-topbar">
          <button
            type="button"
            className="adm-icon-btn adm-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" />
          </button>

          <div className="adm-topbar-title">{current?.label || "Admin"}</div>

          <Link
            to="/admin/settings"
            className="adm-account"
            title="Account settings"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="adm-avatar">{initials(admin?.name)}</span>
            <span className="adm-account-text">
              <strong>{admin?.name || "Admin"}</strong>
              <small>{admin?.email}</small>
            </span>
          </Link>
        </header>

        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
