
const FAQ = require("../models/FAQ");


// ==================================================
// 1. GET ALL PUBLISHED FAQS
// PUBLIC API
// GET /api/faq
// ==================================================

const getPublishedFAQs = async (
  req,
  res
) => {

  try {

    const faqs =
      await FAQ.find({

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

      count: faqs.length,

      data: faqs,

    });


  } catch (error) {

    console.error(
      "Get Published FAQs Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to get FAQs.",

    });

  }

};



// ==================================================
// 2. CREATE FAQ
// ADMIN ONLY
// POST /api/faq
// ==================================================

const createFAQ = async (
  req,
  res
) => {

  try {

    const {

      question,

      answer,

      category,

      displayOrder,

      isFeatured,

      isPublished,

    } = req.body;


    // ==================================================
    // CHECK REQUIRED FIELDS
    // ==================================================

    if (
      !question ||
      !answer
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Question and answer are required.",

      });

    }


    // ==================================================
    // CONVERT PUBLISHED STATUS
    // ==================================================

    const published =
      isPublished === true ||
      isPublished === "true";


    // ==================================================
    // CREATE FAQ
    // ==================================================

    const faq =
      await FAQ.create({

        question:
          question.trim(),

        answer:
          answer.trim(),

        category:
          category ||
          "General",

        displayOrder:
          Number(
            displayOrder
          ) || 0,

        isFeatured:
          isFeatured === true ||
          isFeatured === "true",

        isPublished:
          published,

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
        "FAQ created successfully.",

      data:
        faq,

    });


  } catch (error) {

    console.error(
      "Create FAQ Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to create FAQ.",

    });

  }

};



// ==================================================
// 3. UPDATE FAQ
// ADMIN ONLY
// PUT /api/faq/:id
// ==================================================

const updateFAQ = async (
  req,
  res
) => {

  try {

    const faq =
      await FAQ.findById(
        req.params.id
      );


    // ==================================================
    // CHECK FAQ EXISTS
    // ==================================================

    if (!faq) {

      return res.status(404).json({

        success: false,

        message:
          "FAQ not found.",

      });

    }


    const {

      question,

      answer,

      category,

      displayOrder,

      isFeatured,

      isPublished,

    } = req.body;


    // ==================================================
    // UPDATE QUESTION
    // ==================================================

    if (
      question !== undefined
    ) {

      faq.question =
        question.trim();

    }


    // ==================================================
    // UPDATE ANSWER
    // ==================================================

    if (
      answer !== undefined
    ) {

      faq.answer =
        answer.trim();

    }


    // ==================================================
    // UPDATE CATEGORY
    // ==================================================

    if (
      category !== undefined
    ) {

      faq.category =
        category;

    }


    // ==================================================
    // UPDATE DISPLAY ORDER
    // ==================================================

    if (
      displayOrder !== undefined
    ) {

      faq.displayOrder =
        Number(
          displayOrder
        ) || 0;

    }


    // ==================================================
    // UPDATE FEATURED STATUS
    // ==================================================

    if (
      isFeatured !== undefined
    ) {

      faq.isFeatured =
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


      faq.isPublished =
        published;


      // ==================================================
      // SET PUBLISHED DATE
      // ==================================================

      if (
        published &&
        !faq.publishedAt
      ) {

        faq.publishedAt =
          new Date();

      }


      // ==================================================
      // REMOVE PUBLISHED DATE
      // ==================================================

      if (
        !published
      ) {

        faq.publishedAt =
          null;

      }

    }


    // ==================================================
    // SAVE FAQ
    // ==================================================

    await faq.save();


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "FAQ updated successfully.",

      data:
        faq,

    });


  } catch (error) {

    console.error(
      "Update FAQ Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to update FAQ.",

    });

  }

};



// ==================================================
// 4. DELETE FAQ
// ADMIN ONLY
// DELETE /api/faq/:id
// ==================================================

const deleteFAQ = async (
  req,
  res
) => {

  try {

    const faq =
      await FAQ.findById(
        req.params.id
      );


    // ==================================================
    // CHECK FAQ EXISTS
    // ==================================================

    if (!faq) {

      return res.status(404).json({

        success: false,

        message:
          "FAQ not found.",

      });

    }


    // ==================================================
    // DELETE FAQ
    // ==================================================

    await FAQ.findByIdAndDelete(
      req.params.id
    );


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "FAQ deleted successfully.",

    });


  } catch (error) {

    console.error(
      "Delete FAQ Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to delete FAQ.",

    });

  }

};



// ==================================================
// EXPORT ALL CONTROLLERS
// ==================================================

module.exports = {

  getPublishedFAQs,

  createFAQ,

  updateFAQ,

  deleteFAQ,

};