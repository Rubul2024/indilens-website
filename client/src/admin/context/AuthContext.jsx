import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { authApi, getToken, setToken, UNAUTHORIZED_EVENT } from "../lib/api";

const AuthContext = createContext(null);

// status: "checking" -> "authenticated" | "guest" | "unreachable"
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState(() => (getToken() ? "checking" : "guest"));
  const [notice, setNotice] = useState("");

  const signOut = useCallback((message = "") => {
    setToken(null);
    setAdmin(null);
    setStatus("guest");
    setNotice(message);
  }, []);

  // Verify a stored token once on load
  useEffect(() => {
    if (status !== "checking") return;

    let cancelled = false;

    authApi
      .profile()
      .then((data) => {
        if (cancelled) return;
        setAdmin(data.data);
        setStatus("authenticated");
      })
      .catch((error) => {
        if (cancelled) return;
        // A network failure should not throw away a valid session
        if (error.status === 0 || error.status >= 500) {
          setNotice(error.message);
          setStatus("unreachable");
          return;
        }
        signOut();
      });

    return () => {
      cancelled = true;
    };
  }, [status, signOut]);

  // Any 401 from an authenticated request ends the session
  useEffect(() => {
    const handler = (event) =>
      signOut(event.detail || "Your session has expired. Please sign in again.");

    window.addEventListener(UNAUTHORIZED_EVENT, handler);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler);
  }, [signOut]);

  const signIn = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    setToken(data.token);
    setAdmin(data.admin);
    setNotice("");
    setStatus("authenticated");
    return data.admin;
  }, []);

  const value = useMemo(
    () => ({
      admin,
      status,
      notice,
      setAdmin,
      signIn,
      signOut,
      clearNotice: () => setNotice(""),
      retry: () => setStatus(getToken() ? "checking" : "guest"),
      // Password changes rotate the token server-side
      replaceToken: (token) => token && setToken(token),
    }),
    [admin, status, notice, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
