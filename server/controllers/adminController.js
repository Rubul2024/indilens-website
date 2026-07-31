const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// ======================================================
// REGISTER ADMIN
// ======================================================

const registerAdmin = async (req, res) => {
  try {
    if (process.env.ALLOW_ADMIN_REGISTRATION !== "true") {
      return res.status(403).json({
        success: false,
        message: "Admin registration is disabled.",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      data: admin,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================================================
// LOGIN ADMIN
// ======================================================

const loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      admin,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================================================
// GET PROFILE
// ======================================================

const getAdminProfile = async (req, res) => {

  try {

    const admin = await Admin.findById(req.admin._id).select("-password");

    res.json({
      success: true,
      data: admin,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================================================
// UPDATE PASSWORD
// ======================================================

const updatePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {

      return res.status(400).json({
        success: false,
        message: "Both passwords are required.",
      });

    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });

    }

    const match = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!match) {

      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });

    }

    admin.password = await bcrypt.hash(newPassword, 10);

    await admin.save();

    res.json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================================================

module.exports = {

  registerAdmin,

  loginAdmin,

  getAdminProfile,

  updatePassword,

};