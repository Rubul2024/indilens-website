import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import Icon from "./components/Icon";
import { Spinner } from "./components/ui";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ContactsPage from "./pages/ContactsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NewsletterPage from "./pages/NewsletterPage";
import ResourceFormPage from "./pages/ResourceFormPage";
import ResourceListPage from "./pages/ResourceListPage";
import SettingsPage from "./pages/SettingsPage";
import { RESOURCE_LIST } from "./resources";

import "./admin.css";

// Keep the admin area out of search engines
const useNoIndex = () => {
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]');
    const previous = meta?.getAttribute("content");
    meta?.setAttribute("content", "noindex, nofollow");

    return () => {
      if (meta && previous) meta.setAttribute("content", previous);
    };
  }, []);
};

const RequireAuth = ({ children }) => {
  const { status, notice, retry, signOut } = useAuth();
  const location = useLocation();

  if (status === "checking") {
    return (
      <div className="adm-fullscreen">
        <Spinner label="Verifying your session…" />
      </div>
    );
  }

  if (status === "unreachable") {
    return (
      <div className="adm-fullscreen">
        <div className="adm-state adm-state--error">
          <Icon name="alert" size={28} />
          <p>{notice || "Unable to reach the server."}</p>
          <div className="adm-row">
            <button type="button" className="adm-btn adm-btn--primary" onClick={retry}>
              Try again
            </button>
            <button type="button" className="adm-btn adm-btn--secondary" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

const AdminApp = () => {
  useNoIndex();

  return (
    <AuthProvider>
      <div className="adm-root">
        <ToastProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />

            <Route
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="newsletter" element={<NewsletterPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="change-password" element={<Navigate to="/admin/settings" replace />} />

              {RESOURCE_LIST.map((resource) => (
                <Route key={resource.key} path={resource.key}>
                  <Route index element={<ResourceListPage key={resource.key} resource={resource} />} />
                  <Route path="new" element={<ResourceFormPage key={`${resource.key}-new`} resource={resource} />} />
                  <Route path=":id/edit" element={<ResourceFormPage key={`${resource.key}-edit`} resource={resource} />} />
                  {/* Old URLs from the previous admin panel */}
                  <Route path="create" element={<Navigate to={`/admin/${resource.key}/new`} replace />} />
                  <Route path="edit/:id" element={<LegacyEditRedirect base={resource.key} />} />
                  <Route path="*" element={<Navigate to={`/admin/${resource.key}`} replace />} />
                </Route>
              ))}

              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Routes>
        </ToastProvider>
      </div>
    </AuthProvider>
  );
};

const LegacyEditRedirect = ({ base }) => {
  const id = useLocation().pathname.split("/").pop();
  return <Navigate to={`/admin/${base}/${id}/edit`} replace />;
};

export default AdminApp;
