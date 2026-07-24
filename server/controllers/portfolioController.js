
const Portfolio = require("../models/Portfolio");


// ==================================================
// 1. GET ALL PUBLISHED PORTFOLIO PROJECTS
// PUBLIC API
// GET /api/portfolio
// ==================================================

const getPublishedPortfolios = async (
  req,
  res
) => {

  try {

    const portfolios =
      await Portfolio.find({
        isPublished: true,
      })
      .sort({
        publishedAt: -1,
      });


    res.status(200).json({

      success: true,

      count: portfolios.length,

      data: portfolios,

    });


  } catch (error) {

    console.error(
      "Get Published Portfolios Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to get portfolio projects.",

    });

  }

};



// ==================================================
// 2. GET SINGLE PUBLISHED PORTFOLIO
// PUBLIC API
// GET /api/portfolio/:slug
// ==================================================

const getPortfolioBySlug = async (
  req,
  res
) => {

  try {

    const portfolio =
      await Portfolio.findOne({

        slug:
          req.params.slug,

        isPublished:
          true,

      });


    // ==================================================
    // CHECK IF PORTFOLIO EXISTS
    // ==================================================

    if (!portfolio) {

      return res.status(404).json({

        success: false,

        message:
          "Portfolio project not found.",

      });

    }


    res.status(200).json({

      success: true,

      data: portfolio,

    });


  } catch (error) {

    console.error(
      "Get Portfolio Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to get portfolio project.",

    });

  }

};



// ==================================================
// 3. CREATE PORTFOLIO
// ADMIN ONLY
// POST /api/portfolio
// ==================================================

const createPortfolio = async (
  req,
  res
) => {

  try {

    const {

      title,

      slug,

      excerpt,

      description,

      featuredImage,

      category,

      clientName,

      technologies,

      liveUrl,

      githubUrl,

      isFeatured,

      isPublished,

    } = req.body;


    // ==================================================
    // CHECK REQUIRED FIELDS
    // ==================================================

    if (
      !title ||
      !slug ||
      !excerpt ||
      !description
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Title, slug, excerpt and description are required.",

      });

    }


    // ==================================================
    // CLEAN SLUG
    // ==================================================

    const cleanSlug =
      slug
        .trim()
        .toLowerCase()
        .replace(
          /\s+/g,
          "-"
        );


    // ==================================================
    // CHECK DUPLICATE SLUG
    // ==================================================

    const existingPortfolio =
      await Portfolio.findOne({

        slug:
          cleanSlug,

      });


    if (existingPortfolio) {

      return res.status(409).json({

        success: false,

        message:
          "A portfolio project with this slug already exists.",

      });

    }


    // ==================================================
    // CREATE PORTFOLIO
    // ==================================================

    const portfolio =
      await Portfolio.create({

        title:
          title.trim(),

        slug:
          cleanSlug,

        excerpt:
          excerpt.trim(),

        description:
          description,

        featuredImage:
          featuredImage || "",

        category:
          category ||
          "Web Development",

        clientName:
          clientName || "",

        technologies:
          technologies || [],

        liveUrl:
          liveUrl || "",

        githubUrl:
          githubUrl || "",

        isFeatured:
          isFeatured === true ||
          isFeatured === "true",

        isPublished:
          isPublished === true ||
          isPublished === "true",

        publishedAt:

          isPublished === true ||
          isPublished === "true"

            ? new Date()

            : null,

      });


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(201).json({

      success: true,

      message:
        "Portfolio project created successfully.",

      data:
        portfolio,

    });


  } catch (error) {

    console.error(
      "Create Portfolio Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to create portfolio project.",

    });

  }

};



// ==================================================
// 4. UPDATE PORTFOLIO
// ADMIN ONLY
// PUT /api/portfolio/:id
// ==================================================

const updatePortfolio = async (
  req,
  res
) => {

  try {

    const portfolio =
      await Portfolio.findById(
        req.params.id
      );


    // ==================================================
    // CHECK PORTFOLIO EXISTS
    // ==================================================

    if (!portfolio) {

      return res.status(404).json({

        success: false,

        message:
          "Portfolio project not found.",

      });

    }


    const {

      title,

      slug,

      excerpt,

      description,

      featuredImage,

      category,

      clientName,

      technologies,

      liveUrl,

      githubUrl,

      isFeatured,

      isPublished,

    } = req.body;


    // ==================================================
    // UPDATE TITLE
    // ==================================================

    if (
      title !== undefined
    ) {

      portfolio.title =
        title.trim();

    }


    // ==================================================
    // UPDATE SLUG
    // ==================================================

    if (
      slug !== undefined
    ) {

      portfolio.slug =
        slug
          .trim()
          .toLowerCase()
          .replace(
            /\s+/g,
            "-"
          );

    }


    // ==================================================
    // UPDATE EXCERPT
    // ==================================================

    if (
      excerpt !== undefined
    ) {

      portfolio.excerpt =
        excerpt.trim();

    }


    // ==================================================
    // UPDATE DESCRIPTION
    // ==================================================

    if (
      description !== undefined
    ) {

      portfolio.description =
        description;

    }


    // ==================================================
    // UPDATE IMAGE URL
    // ==================================================

    if (
      featuredImage !== undefined
    ) {

      portfolio.featuredImage =
        featuredImage;

    }


    // ==================================================
    // UPDATE CATEGORY
    // ==================================================

    if (
      category !== undefined
    ) {

      portfolio.category =
        category;

    }


    // ==================================================
    // UPDATE CLIENT
    // ==================================================

    if (
      clientName !== undefined
    ) {

      portfolio.clientName =
        clientName;

    }


    // ==================================================
    // UPDATE TECHNOLOGIES
    // ==================================================

    if (
      technologies !== undefined
    ) {

      portfolio.technologies =
        technologies;

    }


    // ==================================================
    // UPDATE LIVE URL
    // ==================================================

    if (
      liveUrl !== undefined
    ) {

      portfolio.liveUrl =
        liveUrl;

    }


    // ==================================================
    // UPDATE GITHUB URL
    // ==================================================

    if (
      githubUrl !== undefined
    ) {

      portfolio.githubUrl =
        githubUrl;

    }


    // ==================================================
    // UPDATE FEATURED STATUS
    // ==================================================

    if (
      isFeatured !== undefined
    ) {

      portfolio.isFeatured =
        isFeatured === true ||
        isFeatured === "true";

    }


    // ==================================================
    // UPDATE PUBLISHED STATUS
    // ==================================================

    if (
      isPublished !== undefined
    ) {

      const published =
        isPublished === true ||
        isPublished === "true";


      portfolio.isPublished =
        published;


      // ==================================================
      // SET PUBLISHED DATE
      // ==================================================

      if (
        published &&
        !portfolio.publishedAt
      ) {

        portfolio.publishedAt =
          new Date();

      }


      // ==================================================
      // REMOVE PUBLISHED DATE
      // ==================================================

      if (
        !published
      ) {

        portfolio.publishedAt =
          null;

      }

    }


    // ==================================================
    // SAVE PORTFOLIO
    // ==================================================

    await portfolio.save();


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "Portfolio project updated successfully.",

      data:
        portfolio,

    });


  } catch (error) {

    console.error(
      "Update Portfolio Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to update portfolio project.",

    });

  }

};



// ==================================================
// 5. DELETE PORTFOLIO
// ADMIN ONLY
// DELETE /api/portfolio/:id
// ==================================================

const deletePortfolio = async (
  req,
  res
) => {

  try {

    const portfolio =
      await Portfolio.findById(
        req.params.id
      );


    // ==================================================
    // CHECK PORTFOLIO EXISTS
    // ==================================================

    if (!portfolio) {

      return res.status(404).json({

        success: false,

        message:
          "Portfolio project not found.",

      });

    }


    // ==================================================
    // DELETE PORTFOLIO
    // ==================================================

    await Portfolio.findByIdAndDelete(
      req.params.id
    );


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "Portfolio project deleted successfully.",

    });


  } catch (error) {

    console.error(
      "Delete Portfolio Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to delete portfolio project.",

    });

  }

};



// ==================================================
// EXPORT CONTROLLERS
// ==================================================

module.exports = {

  getPublishedPortfolios,

  getPortfolioBySlug,

  createPortfolio,

  updatePortfolio,

  deletePortfolio,

};