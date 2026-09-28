const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// ==========================================
// ADMIN AUTHENTICATION MIDDLEWARE
// ==========================================

const unauthorized = (res, message) =>
  res.status(401).json({ success: false, message });

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return unauthorized(res, "Not authorized. Please login as admin.");
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured.");
      return res.status(500).json({
        success: false,
        message: "Authentication is not configured on the server.",
      });
    }

    const token = authHeader.slice(7).trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return unauthorized(res, "Admin account not found.");
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive.",
      });
    }

    // Reject tokens issued before the last password change
    if (
      admin.passwordChangedAt &&
      decoded.iat * 1000 < admin.passwordChangedAt.getTime()
    ) {
      return unauthorized(res, "Session expired. Please login again.");
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return unauthorized(res, "Session expired. Please login again.");
    }

    if (error.name === "JsonWebTokenError" || error.name === "CastError") {
      return unauthorized(res, "Invalid authentication token.");
    }

    console.error("Authentication Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication error.",
    });
  }
};

module.exports = {
  protect,
};
