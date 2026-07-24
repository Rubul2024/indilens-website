const express = require("express");

const {

  registerAdmin,

  loginAdmin,

  getAdminProfile,

} = require("../controllers/adminController");


const {
  protect,
} = require("../middleware/authMiddleware");


const router =
  express.Router();



// ==========================================
// REGISTER ADMIN
// POST /api/admin/register
// ==========================================

router.post(

  "/register",

  registerAdmin

);



// ==========================================
// ADMIN LOGIN
// POST /api/admin/login
// ==========================================

router.post(

  "/login",

  loginAdmin

);



// ==========================================
// GET ADMIN PROFILE
// GET /api/admin/profile
// PROTECTED
// ==========================================

router.get(

  "/profile",

  protect,

  getAdminProfile

);



module.exports = router;