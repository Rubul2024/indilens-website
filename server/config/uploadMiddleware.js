const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

// ==========================================
// CLOUDINARY STORAGE
// ==========================================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: "indilens/blogs",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// ==========================================
// MULTER UPLOAD
// ==========================================

const upload = multer({
  storage: storage,
});

// ==========================================
// EXPORT
// ==========================================

module.exports = upload;
