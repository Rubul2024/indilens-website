

// ==========================================
// ADMIN API
// ==========================================

const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET ADMIN PROFILE
// ==========================================

export const getAdminProfile = async () => {

  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/api/admin/profile`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to get admin profile."
    );
  }

  return data;
};