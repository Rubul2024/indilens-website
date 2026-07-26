const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ==========================================
// ADMIN AUTHENTICATION MIDDLEWARE
// ==========================================
// This middleware checks whether the request
// contains a valid JWT token.
// ==========================================

const protectAdmin = async (req, res, next) => {
  try {
    // ========================================
    // STEP 1: GET AUTHORIZATION HEADER
    // ========================================

    const authHeader = req.headers.authorization;

    // ========================================
    // STEP 2: CHECK AUTHORIZATION HEADER
    // ========================================

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authentication token provided.",
      });
    }

    // ========================================
    // STEP 3: GET JWT TOKEN
    // ========================================

    const token = authHeader.split(" ")[1];

    // ========================================
    // STEP 4: VERIFY JWT TOKEN
    // ========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ========================================
    // STEP 5: FIND ADMIN IN DATABASE
    // ========================================

    const admin = await Admin.findById(decoded.id).select("-password");

    // ========================================
    // STEP 6: CHECK ADMIN EXISTS
    // ========================================

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    // ========================================
    // STEP 7: CHECK ADMIN ACTIVE STATUS
    // ========================================

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive.",
      });
    }

    // ========================================
    // STEP 8: SAVE ADMIN IN REQUEST
    // ========================================

    req.admin = admin;

    // ========================================
    // STEP 9: CONTINUE TO NEXT FUNCTION
    // ========================================

    next();

  } catch (error) {

    // ========================================
    // JWT TOKEN EXPIRED
    // ========================================

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Authentication token has expired.",
      });
    }

    // ========================================
    // JWT TOKEN INVALID
    // ========================================

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // ========================================
    // OTHER ERRORS
    // ========================================

    console.error("Admin Authentication Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication error.",
    });
  }
};

module.exports = protectAdmin;