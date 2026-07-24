const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// ==========================================
// REGISTER ADMIN
// POST /api/admin/register
// ==========================================

const registerAdmin = async (req, res) => {

  try {
    // ========================================
    // CHECK ADMIN REGISTRATION STATUS
    // ========================================

    if (process.env.ALLOW_ADMIN_REGISTRATION !== "true") {
      return res.status(403).json({
        success: false,
        message: "Admin registration is currently disabled.",
      });
    }

    // ========================================
    // GET REQUEST DATA
    // ========================================

    const { name, email, password } = req.body;

    // ========================================
    // VALIDATE REQUIRED FIELDS
    // ========================================

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,

        message: "Name, email and password are required.",
      });
    }

    // ========================================
    // CHECK PASSWORD LENGTH
    // ========================================

    if (password.length < 6) {
      return res.status(400).json({
        success: false,

        message: "Password must be at least 6 characters long.",
      });
    }

    // ========================================
    // CHECK EXISTING ADMIN
    // ========================================

    const existingAdmin = await Admin.findOne({
      email,
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,

        message: "An admin with this email already exists.",
      });
    }

    // ========================================
    // HASH PASSWORD
    // ========================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ========================================
    // CREATE ADMIN
    // ========================================

    const admin = await Admin.create({
      name,

      email,

      password: hashedPassword,
    });

    // ========================================
    // RESPONSE
    // ========================================

    res.status(201).json({
      success: true,

      message: "Admin account created successfully.",

      data: {
        id: admin._id,

        name: admin.name,

        email: admin.email,

        role: admin.role,

        isActive: admin.isActive,
      },
    });
  } catch (error) {
    console.error("Admin Registration Error:", error);

    res.status(500).json({
      success: false,

      message: "Unable to create admin account.",
    });
  }
};

// ==========================================
// ADMIN LOGIN
// POST /api/admin/login
// ==========================================

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ========================================
    // VALIDATE REQUIRED FIELDS
    // ========================================

    if (!email || !password) {
      return res.status(400).json({
        success: false,

        message: "Email and password are required.",
      });
    }

    // ========================================
    // FIND ADMIN
    // ========================================

    const admin = await Admin.findOne({
      email,
    });

    // ========================================
    // CHECK ADMIN EXISTS
    // ========================================

    if (!admin) {
      return res.status(401).json({
        success: false,

        message: "Invalid email or password.",
      });
    }

    // ========================================
    // CHECK ADMIN ACTIVE STATUS
    // ========================================

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,

        message: "This admin account is inactive.",
      });
    }

    // ========================================
    // COMPARE PASSWORD
    // ========================================

    const isPasswordCorrect = await bcrypt.compare(
      password,

      admin.password,
    );

    // ========================================
    // CHECK PASSWORD
    // ========================================

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,

        message: "Invalid email or password.",
      });
    }

    // ========================================
    // CREATE JWT TOKEN
    // ========================================

    const token = jwt.sign(
      {
        id: admin._id,

        email: admin.email,

        role: admin.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      },
    );

    // ========================================
    // LOGIN SUCCESS RESPONSE
    // ========================================

    res.status(200).json({
      success: true,

      message: "Admin login successful.",

      token,

      admin: {
        id: admin._id,

        name: admin.name,

        email: admin.email,

        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    res.status(500).json({
      success: false,

      message: "Unable to login admin.",
    });
  }
};

// ==========================================
// GET ADMIN PROFILE
// GET /api/admin/profile
// PROTECTED ROUTE
// ==========================================

const getAdminProfile = async (req, res) => {
  try {
    // ========================================
    // ADMIN COMES FROM AUTH MIDDLEWARE
    // ========================================

    const admin = req.admin;

    // ========================================
    // RETURN ADMIN PROFILE
    // ========================================

    res.status(200).json({
      success: true,

      data: {
        id: admin._id,

        name: admin.name,

        email: admin.email,

        role: admin.role,

        isActive: admin.isActive,

        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    console.error("Get Admin Profile Error:", error);

    res.status(500).json({
      success: false,

      message: "Unable to get admin profile.",
    });
  }
};

module.exports = {
  registerAdmin,

  loginAdmin,

  getAdminProfile,
};
