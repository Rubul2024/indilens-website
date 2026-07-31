const API_URL = import.meta.env.VITE_API_URL;

// ========================================
// GET ADMIN TOKEN
// ========================================

const getToken = () => {
  return localStorage.getItem("adminToken");
};

// ========================================
// COMMON HEADERS
// ========================================

const getHeaders = () => ({
  "Content-Type": "application/json",

  Authorization: `Bearer ${getToken()}`,
});

// ========================================
// GET ALL FAQS
// ========================================

export const getAdminFAQs = async () => {
  const response = await fetch(
    `${API_URL}/api/faq`,
    {
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load FAQs."
    );
  }

  return data;
};

// ========================================
// GET SINGLE FAQ
// ========================================

export const getFAQById = async (id) => {
  const response = await fetch(
    `${API_URL}/api/faq/${id}`,
    {
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load FAQ."
    );
  }

  return data;
};

// ========================================
// CREATE FAQ
// ========================================

export const createFAQ = async (faqData) => {
  const response = await fetch(
    `${API_URL}/api/faq`,
    {
      method: "POST",

      headers: getHeaders(),

      body: JSON.stringify(faqData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create FAQ."
    );
  }

  return data;
};

// ========================================
// UPDATE FAQ
// ========================================

export const updateFAQ = async (
  id,
  faqData
) => {
  const response = await fetch(
    `${API_URL}/api/faq/${id}`,
    {
      method: "PUT",

      headers: getHeaders(),

      body: JSON.stringify(faqData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to update FAQ."
    );
  }

  return data;
};

// ========================================
// DELETE FAQ
// ========================================

export const deleteFAQ = async (id) => {
  const response = await fetch(
    `${API_URL}/api/faq/${id}`,
    {
      method: "DELETE",

      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to delete FAQ."
    );
  }

  return data;
};