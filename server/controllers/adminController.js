const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Used to keep login timing constant when the email is unknown
const DUMMY_HASH = bcrypt.hashSync("indilens-timing-guard", 10);

const signToken = (admin) =>
  jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

const validatePasswordStrength = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Password must contain at least one letter and one number.";
  }

  return null;
};

// ======================================================
// LOGIN ADMIN
// POST /api/admin/login
// ======================================================

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured.");
      return res.status(500).json({
        success: false,
        message: "Authentication is not configured on the server.",
      });
    }

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });

    const match = await bcrypt.compare(password, admin ? admin.password : DUMMY_HASH);

    if (!admin || !match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "This admin account is inactive.",
      });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    res.json({
      success: true,
      token: signToken(admin),
      admin,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to login right now. Please try again.",
    });
  }
};

// ======================================================
// GET PROFILE
// GET /api/admin/profile
// ======================================================

const getAdminProfile = async (req, res) => {
  res.json({
    success: true,
    data: req.admin,
  });
};

// ======================================================
// UPDATE PROFILE
// PUT /api/admin/profile
// ======================================================

const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body || {};
    const admin = req.admin;

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ success: false, message: "Name is required." });
      }
      admin.name = name.trim();
    }

    if (email !== undefined) {
      const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

      if (!EMAIL_REGEX.test(cleanEmail)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email address." });
      }

      const taken = await Admin.findOne({ email: cleanEmail, _id: { $ne: admin._id } });

      if (taken) {
        return res.status(409).json({ success: false, message: "This email is already in use." });
      }

      admin.email = cleanEmail;
    }

    await admin.save();

    res.json({
      success: true,
      message: "Profile updated successfully.",
      data: admin,
    });
  } catch (error) {
    console.error("Update Admin Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
};

// ======================================================
// UPDATE PASSWORD
// PUT /api/admin/password
// ======================================================

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};

    if (typeof currentPassword !== "string" || typeof newPassword !== "string" || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new passwords are required.",
      });
    }

    const strengthError = validatePasswordStrength(newPassword);

    if (strengthError) {
      return res.status(400).json({ success: false, message: strengthError });
    }

    const admin = req.admin;

    const match = await bcrypt.compare(currentPassword, admin.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    if (await bcrypt.compare(newPassword, admin.password)) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the current password.",
      });
    }

    admin.password = await bcrypt.hash(newPassword, 12);
    // Back-date by a second so the fresh token below stays valid
    admin.passwordChangedAt = new Date(Date.now() - 1000);
    await admin.save();

    res.json({
      success: true,
      message: "Password updated successfully.",
      token: signToken(admin),
    });
  } catch (error) {
    console.error("Update Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update password.",
    });
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  updatePassword,
};
