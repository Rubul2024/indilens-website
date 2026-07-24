
const express = require("express");

const router = express.Router();


// ========================================
// TEST ROUTE
// ========================================

router.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "Indilens Test API is Working 🚀",

  });

});


module.exports = router;