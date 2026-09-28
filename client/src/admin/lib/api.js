// ========================================
// ADMIN API CLIENT
// ========================================
// One place for base URL, auth header, JSON handling and
// session expiry. A 401 on any authenticated call signs the
// admin out (see AuthContext).
// ========================================

export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const TOKEN_KEY = "adminToken";

export const UNAUTHORIZED_EVENT = "indilens:admin-unauthorized";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
    // Legacy keys from the previous admin panel
    localStorage.removeItem("adminData");
    localStorage.removeItem("admin");
  } catch {
    // Storage unavailable (private mode); session lasts for this tab only
  }
};

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const apiRequest = async (path, { method = "GET", body, auth = true, signal } = {}) => {
  const headers = {};

  if (body !== undefined) headers["Content-Type"] = "application/json";

  const token = getToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError("Unable to reach the server. Check your connection and try again.", 0);
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    // Non-JSON response (e.g. gateway error page)
  }

  if (!response.ok) {
    if (response.status === 401 && auth) {
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT, { detail: data.message }));
    }

    throw new ApiError(data.message || `Request failed (${response.status}).`, response.status);
  }

  return data;
};

// ========================================
// ENDPOINTS
// ========================================

export const authApi = {
  login: (email, password) =>
    apiRequest("/api/admin/login", { method: "POST", body: { email, password }, auth: false }),
  profile: () => apiRequest("/api/admin/profile"),
  updateProfile: (data) => apiRequest("/api/admin/profile", { method: "PUT", body: data }),
  changePassword: (data) => apiRequest("/api/admin/password", { method: "PUT", body: data }),
};

export const dashboardApi = {
  overview: (signal) => apiRequest("/api/admin/dashboard", { signal }),
};

export const contactsApi = {
  list: (signal) => apiRequest("/api/contact", { signal }),
  setStatus: (id, status) => apiRequest(`/api/contact/${id}`, { method: "PUT", body: { status } }),
  remove: (id) => apiRequest(`/api/contact/${id}`, { method: "DELETE" }),
};

export const newsletterApi = {
  list: (signal) => apiRequest("/api/newsletter", { signal }),
  setActive: (id, isActive) => apiRequest(`/api/newsletter/${id}`, { method: "PUT", body: { isActive } }),
  remove: (id) => apiRequest(`/api/newsletter/${id}`, { method: "DELETE" }),
};

// Content collections share the same shape: /api/<base>/admin/all etc.
export const resourceApi = (base) => ({
  list: (signal) => apiRequest(`/api/${base}/admin/all`, { signal }),
  get: (id, signal) => apiRequest(`/api/${base}/admin/${id}`, { signal }),
  create: (data) => apiRequest(`/api/${base}`, { method: "POST", body: data }),
  update: (id, data) => apiRequest(`/api/${base}/${id}`, { method: "PUT", body: data }),
  remove: (id) => apiRequest(`/api/${base}/${id}`, { method: "DELETE" }),
});
