
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");


// ==========================================
// ADMIN AUTHENTICATION MIDDLEWARE
// ==========================================

const protect = async (req, res, next) => {

  try {

    // ========================================
    // GET AUTHORIZATION HEADER
    // ========================================

    const authHeader =
      req.headers.authorization;


    // ========================================
    // CHECK AUTHORIZATION HEADER
    // ========================================

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        success: false,
        message:
          "Not authorized. Please login as admin.",
      });

    }


    // ========================================
    // EXTRACT JWT TOKEN
    // ========================================

    const token =
      authHeader.split(" ")[1];


    // ========================================
    // VERIFY JWT TOKEN
    // ========================================

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    // ========================================
    // FIND ADMIN
    // ========================================

    const admin =
      await Admin.findById(
        decoded.id
      ).select(
        "-password"
      );


    // ========================================
    // CHECK ADMIN EXISTS
    // ========================================

    if (!admin) {

      return res.status(401).json({
        success: false,
        message:
          "Admin account not found.",
      });

    }


    // ========================================
    // CHECK ADMIN ACTIVE STATUS
    // ========================================

    if (!admin.isActive) {

      return res.status(403).json({
        success: false,
        message:
          "Admin account is inactive.",
      });

    }


    // ========================================
    // ATTACH ADMIN TO REQUEST
    // ========================================

    req.admin = admin;


    // ========================================
    // MOVE TO NEXT FUNCTION
    // ========================================

    next();

  } catch (error) {

    console.error(
      "Authentication Error:",
      error
    );


    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token.",
    });

  }

};


module.exports = {
  protect,
};