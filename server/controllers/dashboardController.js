const Contact = require("../models/Contact");

const Newsletter = require("../models/Newsletter");

const Blog = require("../models/Blog");

const Portfolio = require("../models/Portfolio");

const Service = require("../models/Service");

const FAQ = require("../models/FAQ");

const Team = require("../models/Team");

// ==================================================
// ADMIN DASHBOARD OVERVIEW
// ==================================================

const getDashboardOverview = async (req, res) => {
  try {
    // ==================================================
    // GET TOTAL CONTACT MESSAGES
    // ==================================================

    const totalContacts = await Contact.countDocuments();

    // ==================================================
    // GET TOTAL NEWSLETTER SUBSCRIBERS
    // ==================================================

    const totalNewsletterSubscribers = await Newsletter.countDocuments();

    // ==================================================
    // GET TOTAL BLOG POSTS
    // ==================================================

    const totalBlogs = await Blog.countDocuments();

    // ==================================================
    // GET TOTAL PORTFOLIO PROJECTS
    // ==================================================

    const totalPortfolioProjects = await Portfolio.countDocuments();

    // ==================================================
    // GET TOTAL SERVICES
    // ==================================================

    const totalServices = await Service.countDocuments();

    // ==================================================
    // GET TOTAL FAQS
    // ==================================================

    const totalFAQs = await FAQ.countDocuments();

    // ==================================================
    // GET TOTAL TEAM MEMBERS
    // ==================================================

    const totalTeamMembers = await Team.countDocuments();

    // ==================================================
    // GET PUBLISHED BLOGS
    // ==================================================

    const publishedBlogs = await Blog.countDocuments({
      isPublished: true,
    });

    // ==================================================
    // GET PUBLISHED PORTFOLIO PROJECTS
    // ==================================================

    const publishedPortfolioProjects = await Portfolio.countDocuments({
      isPublished: true,
    });

    // ==================================================
    // GET PUBLISHED SERVICES
    // ==================================================

    const publishedServices = await Service.countDocuments({
      isPublished: true,
    });

    // ==================================================
    // GET PUBLISHED FAQS
    // ==================================================

    const publishedFAQs = await FAQ.countDocuments({
      isPublished: true,
    });

    // ==================================================
    // GET PUBLISHED TEAM MEMBERS
    // ==================================================

    const publishedTeamMembers = await Team.countDocuments({
      isPublished: true,
    });

    // ==================================================
    // GET RECENT CONTACT MESSAGES
    //
    // Latest 5 messages
    // ==================================================

    const recentContacts = await Contact.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ==================================================
    // GET RECENT BLOG POSTS
    //
    // Latest 5 blog posts
    // ==================================================

    const recentBlogs = await Blog.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ==================================================
    // GET RECENT NEWSLETTER SUBSCRIBERS
    //
    // Latest 5 subscribers
    // ==================================================

    const recentSubscribers = await Newsletter.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ==================================================
    // SEND DASHBOARD DATA
    // ==================================================

    res.status(200).json({
      success: true,

      message: "Dashboard data fetched successfully.",

      // ==================================================
      // SUMMARY
      // ==================================================

      summary: {
        totalContacts,

        totalNewsletterSubscribers,

        totalBlogs,

        totalPortfolioProjects,

        totalServices,

        totalFAQs,

        totalTeamMembers,
      },

      // ==================================================
      // PUBLISHED CONTENT SUMMARY
      // ==================================================

      published: {
        publishedBlogs,

        publishedPortfolioProjects,

        publishedServices,

        publishedFAQs,

        publishedTeamMembers,
      },

      // ==================================================
      // RECENT DATA
      // ==================================================

      recent: {
        contacts: recentContacts,

        blogs: recentBlogs,

        subscribers: recentSubscribers,
      },
    });
  } catch (error) {
    // ==================================================
    // SERVER ERROR
    // ==================================================

    console.error("Dashboard Overview Error:", error);

    res.status(500).json({
      success: false,

      message: "Unable to load dashboard data.",
      error: error.message,
    });
  }
};

// ==================================================
// EXPORT CONTROLLER
// ==================================================

module.exports = {
  getDashboardOverview,
};
