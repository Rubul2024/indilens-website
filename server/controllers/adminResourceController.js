const mongoose = require("mongoose");

// ==================================================
// SHARED ADMIN READ HANDLERS
// ==================================================
// Admin screens need every record (drafts included) and lookups by id,
// while the public routes only expose published records by slug.
// ==================================================

const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({
      success: false,
      message: "Record not found.",
    });
  }

  next();
};

const listAll = (Model, sort) => async (req, res) => {
  try {
    const records = await Model.find().sort(sort);

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error(`List ${Model.modelName} Error:`, error);

    res.status(500).json({
      success: false,
      message: "Unable to load records.",
    });
  }
};

const getById = (Model) => async (req, res) => {
  try {
    const record = await Model.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error(`Get ${Model.modelName} Error:`, error);

    res.status(500).json({
      success: false,
      message: "Unable to load record.",
    });
  }
};

module.exports = {
  validateObjectId,
  listAll,
  getById,
};
