const Contact = require("../models/Contact");
const Newsletter = require("../models/Newsletter");
const Blog = require("../models/Blog");
const Portfolio = require("../models/Portfolio");
const Service = require("../models/Service");
const FAQ = require("../models/FAQ");
const Team = require("../models/Team");

// ==================================================
// ADMIN DASHBOARD OVERVIEW
// GET /api/admin/dashboard
// ==================================================

const getDashboardOverview = async (req, res) => {
  try {
    const published = { isPublished: true };

    const [
      totalContacts,
      newContacts,
      totalNewsletterSubscribers,
      activeNewsletterSubscribers,
      totalBlogs,
      totalPortfolioProjects,
      totalServices,
      totalFAQs,
      totalTeamMembers,
      publishedBlogs,
      publishedPortfolioProjects,
      publishedServices,
      publishedFAQs,
      publishedTeamMembers,
      recentContacts,
      recentBlogs,
      recentSubscribers,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Newsletter.countDocuments(),
      Newsletter.countDocuments({ isActive: true }),
      Blog.countDocuments(),
      Portfolio.countDocuments(),
      Service.countDocuments(),
      FAQ.countDocuments(),
      Team.countDocuments(),
      Blog.countDocuments(published),
      Portfolio.countDocuments(published),
      Service.countDocuments(published),
      FAQ.countDocuments(published),
      Team.countDocuments(published),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject status createdAt"),
      Blog.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title category isPublished createdAt"),
      Newsletter.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("email isActive createdAt"),
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",

      summary: {
        totalContacts,
        newContacts,
        totalNewsletterSubscribers,
        activeNewsletterSubscribers,
        totalBlogs,
        totalPortfolioProjects,
        totalServices,
        totalFAQs,
        totalTeamMembers,
      },

      published: {
        publishedBlogs,
        publishedPortfolioProjects,
        publishedServices,
        publishedFAQs,
        publishedTeamMembers,
      },

      recent: {
        contacts: recentContacts,
        blogs: recentBlogs,
        subscribers: recentSubscribers,
      },
    });
  } catch (error) {
    console.error("Dashboard Overview Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard data.",
    });
  }
};

module.exports = {
  getDashboardOverview,
};
