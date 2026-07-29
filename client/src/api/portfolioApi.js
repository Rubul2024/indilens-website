const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


// ========================================
// GET ADMIN PORTFOLIOS
// ========================================

export const getAdminPortfolios = async () => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
   `${API_URL}/api/portfolio/create`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Unable to load portfolio projects."
    );
  }

  return data;
};


// ========================================
// GET SINGLE PORTFOLIO
// ========================================

export const getPortfolioById = async (id) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/api/portfolio/${id}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Unable to load portfolio project."
    );
  }

  return data;
};


// ========================================
// CREATE PORTFOLIO
// ========================================

export const createPortfolio = async (
  portfolioData
) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/api/portfolio/create`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(
        portfolioData
      ),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Unable to create portfolio project."
    );
  }

  return data;
};


// ========================================
// UPDATE PORTFOLIO
// ========================================

export const updatePortfolio = async (
  id,
  portfolioData
) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/api/portfolio/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(
        portfolioData
      ),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Unable to update portfolio project."
    );
  }

  return data;
};


// ========================================
// DELETE PORTFOLIO
// ========================================

export const deletePortfolio = async (
  id
) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/api/portfolio/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Unable to delete portfolio project."
    );
  }

  return data;
};