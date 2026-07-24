// ========================================
// INDILENS API CONFIGURATION
// ========================================

// Get Backend URL from .env
const API_URL = import.meta.env.VITE_API_URL;


// ========================================
// HELPER FUNCTION
// ========================================

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },

      ...options,
    });


    // Convert response to JSON
    const data = await response.json();


    // Check if API request failed
    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong. Please try again."
      );
    }


    // Return successful response
    return data;


  } catch (error) {

    console.error("API Error:", error);

    throw error;
  }
};


// ========================================
// CONTACT API
// ========================================

// Send Contact Form
export const submitContact = async (contactData) => {

  return apiRequest("/api/contact", {
    method: "POST",

    body: JSON.stringify(contactData),
  });

};


// ========================================
// NEWSLETTER API
// ========================================

// Subscribe to Newsletter
export const subscribeNewsletter = async (email) => {

  return apiRequest("/api/newsletter", {
    method: "POST",

    body: JSON.stringify({
      email,
    }),
  });

};


// ========================================
// BLOG API
// ========================================

// Get Published Blogs
export const getBlogs = async () => {

  return apiRequest("/api/blog", {
    method: "GET",
  });

};


// Get Single Blog by Slug
export const getBlogBySlug = async (slug) => {

  return apiRequest(`/api/blog/${slug}`, {
    method: "GET",
  });

};


// ========================================
// PORTFOLIO API
// ========================================

// Get Portfolio Projects
export const getPortfolio = async () => {

  return apiRequest("/api/portfolio", {
    method: "GET",
  });

};


// ========================================
// SERVICES API
// ========================================

// Get Services
export const getServices = async () => {

  return apiRequest("/api/services", {
    method: "GET",
  });

};


// ========================================
// FAQ API
// ========================================

// Get FAQs
export const getFAQs = async () => {

  return apiRequest("/api/faq", {
    method: "GET",
  });

};


// ========================================
// TEAM API
// ========================================

// Get Team Members
export const getTeam = async () => {

  return apiRequest("/api/team", {
    method: "GET",
  });

};


// ========================================
// EXPORT API URL
// ========================================

export { API_URL };