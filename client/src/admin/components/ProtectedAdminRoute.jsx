import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        // ========================================
        // GET JWT TOKEN
        // ========================================

        const token =
          localStorage.getItem("adminToken");

        // ========================================
        // NO TOKEN
        // ========================================

        if (!token) {
          setIsAuthenticated(false);

          setLoading(false);

          return;
        }

        // ========================================
        // VERIFY TOKEN WITH BACKEND
        // ========================================

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/profile`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // ========================================
        // TOKEN INVALID
        // ========================================

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Authentication failed."
          );
        }

        // ========================================
        // TOKEN VALID
        // ========================================

        localStorage.setItem(
          "adminData",
          JSON.stringify(data.data)
        );

        setIsAuthenticated(true);

      } catch (error) {
        console.error(
          "Admin Authentication Error:",
          error
        );

        // ========================================
        // REMOVE INVALID TOKEN
        // ========================================

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminData"
        );

        setIsAuthenticated(false);

      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  // ========================================
  // CHECKING AUTHENTICATION
  // ========================================

  if (loading) {
    return (
      <main>
        <h2>Checking authentication...</h2>
      </main>
    );
  }

  // ========================================
  // NOT AUTHENTICATED
  // ========================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  // ========================================
  // AUTHENTICATED
  // ========================================

  return <Outlet />;
};

export default ProtectedAdminRoute;