const Service = require("../models/Service");


// ==================================================
// 1. GET ALL PUBLISHED SERVICES
// PUBLIC API
// GET /api/services
// ==================================================

const getPublishedServices = async (
  req,
  res
) => {

  try {

    const services =
      await Service.find({

        isPublished: true,

      })
      .sort({

        displayOrder: 1,

        publishedAt: -1,

      });


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      count: services.length,

      data: services,

    });


  } catch (error) {

    console.error(
      "Get Published Services Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to get services.",

    });

  }

};



// ==================================================
// 2. GET SINGLE PUBLISHED SERVICE
// PUBLIC API
// GET /api/services/:slug
// ==================================================

const getServiceBySlug = async (
  req,
  res
) => {

  try {

    const service =
      await Service.findOne({

        slug:
          req.params.slug,

        isPublished:
          true,

      });


    // ==================================================
    // CHECK SERVICE EXISTS
    // ==================================================

    if (!service) {

      return res.status(404).json({

        success: false,

        message:
          "Service not found.",

      });

    }


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      data: service,

    });


  } catch (error) {

    console.error(
      "Get Service Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to get service.",

    });

  }

};



// ==================================================
// 3. CREATE SERVICE
// ADMIN ONLY
// POST /api/services
// ==================================================

const createService = async (
  req,
  res
) => {

  try {

    const {

      title,

      slug,

      excerpt,

      description,

      icon,

      featuredImage,

      category,

      isFeatured,

      isPublished,

      displayOrder,

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

    const existingService =
      await Service.findOne({

        slug:
          cleanSlug,

      });


    if (existingService) {

      return res.status(409).json({

        success: false,

        message:
          "A service with this slug already exists.",

      });

    }


    // ==================================================
    // CONVERT PUBLISHED STATUS
    // ==================================================

    const published =
      isPublished === true ||
      isPublished === "true";


    // ==================================================
    // CREATE SERVICE
    // ==================================================

    const service =
      await Service.create({

        title:
          title.trim(),

        slug:
          cleanSlug,

        excerpt:
          excerpt.trim(),

        description:
          description,

        icon:
          icon || "",

        featuredImage:
          featuredImage || "",

        category:
          category ||
          "Technology",

        isFeatured:
          isFeatured === true ||
          isFeatured === "true",

        isPublished:
          published,

        displayOrder:
          Number(
            displayOrder
          ) || 0,

        publishedAt:

          published

            ? new Date()

            : null,

      });


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(201).json({

      success: true,

      message:
        "Service created successfully.",

      data:
        service,

    });


  } catch (error) {

    console.error(
      "Create Service Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to create service.",

    });

  }

};



// ==================================================
// 4. UPDATE SERVICE
// ADMIN ONLY
// PUT /api/services/:id
// ==================================================

const updateService = async (
  req,
  res
) => {

  try {

    const service =
      await Service.findById(
        req.params.id
      );


    // ==================================================
    // CHECK SERVICE EXISTS
    // ==================================================

    if (!service) {

      return res.status(404).json({

        success: false,

        message:
          "Service not found.",

      });

    }


    const {

      title,

      slug,

      excerpt,

      description,

      icon,

      featuredImage,

      category,

      isFeatured,

      isPublished,

      displayOrder,

    } = req.body;


    // ==================================================
    // UPDATE TITLE
    // ==================================================

    if (
      title !== undefined
    ) {

      service.title =
        title.trim();

    }


    // ==================================================
    // UPDATE SLUG
    // ==================================================

    if (
      slug !== undefined
    ) {

      service.slug =
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

      service.excerpt =
        excerpt.trim();

    }


    // ==================================================
    // UPDATE DESCRIPTION
    // ==================================================

    if (
      description !== undefined
    ) {

      service.description =
        description;

    }


    // ==================================================
    // UPDATE ICON
    // ==================================================

    if (
      icon !== undefined
    ) {

      service.icon =
        icon;

    }


    // ==================================================
    // UPDATE FEATURED IMAGE
    // ==================================================

    if (
      featuredImage !== undefined
    ) {

      service.featuredImage =
        featuredImage;

    }


    // ==================================================
    // UPDATE CATEGORY
    // ==================================================

    if (
      category !== undefined
    ) {

      service.category =
        category;

    }


    // ==================================================
    // UPDATE FEATURED STATUS
    // ==================================================

    if (
      isFeatured !== undefined
    ) {

      service.isFeatured =
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


      service.isPublished =
        published;


      // ==================================================
      // SET PUBLISHED DATE
      // ==================================================

      if (
        published &&
        !service.publishedAt
      ) {

        service.publishedAt =
          new Date();

      }


      // ==================================================
      // REMOVE PUBLISHED DATE
      // ==================================================

      if (
        !published
      ) {

        service.publishedAt =
          null;

      }

    }


    // ==================================================
    // UPDATE DISPLAY ORDER
    // ==================================================

    if (
      displayOrder !== undefined
    ) {

      service.displayOrder =
        Number(
          displayOrder
        ) || 0;

    }


    // ==================================================
    // SAVE SERVICE
    // ==================================================

    await service.save();


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "Service updated successfully.",

      data:
        service,

    });


  } catch (error) {

    console.error(
      "Update Service Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to update service.",

    });

  }

};



// ==================================================
// 5. DELETE SERVICE
// ADMIN ONLY
// DELETE /api/services/:id
// ==================================================

const deleteService = async (
  req,
  res
) => {

  try {

    const service =
      await Service.findById(
        req.params.id
      );


    // ==================================================
    // CHECK SERVICE EXISTS
    // ==================================================

    if (!service) {

      return res.status(404).json({

        success: false,

        message:
          "Service not found.",

      });

    }


    // ==================================================
    // DELETE SERVICE
    // ==================================================

    await Service.findByIdAndDelete(
      req.params.id
    );


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "Service deleted successfully.",

    });


  } catch (error) {

    console.error(
      "Delete Service Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to delete service.",

    });

  }

};



// ==================================================
// EXPORT ALL CONTROLLERS
// ==================================================

module.exports = {

  getPublishedServices,

  getServiceBySlug,

  createService,

  updateService,

  deleteService,

};