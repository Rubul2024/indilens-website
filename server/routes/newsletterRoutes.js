const express = require("express");


// Import Newsletter Controller
const {

    subscribeNewsletter,

    getAllSubscribers,

    getSubscriberById,

    updateSubscriber,

    deleteSubscriber

} = require("../controllers/newsletterController");


// Import Admin Authentication Middleware
const {
    protect
} = require("../middleware/authMiddleware");


// Create Router
const router = express.Router();



// ==================================================
// PUBLIC ROUTE
// Anyone can subscribe to Newsletter
// POST /api/newsletter
// ==================================================

router.post(

    "/",

    subscribeNewsletter

);



// ==================================================
// ADMIN ROUTE
// Get all Newsletter subscribers
// GET /api/newsletter
// ==================================================

router.get(

    "/",

    protect,

    getAllSubscribers

);



// ==================================================
// ADMIN ROUTE
// Get one Newsletter subscriber
// GET /api/newsletter/:id
// ==================================================

router.get(

    "/:id",

    protect,

    getSubscriberById

);



// ==================================================
// ADMIN ROUTE
// Update Newsletter subscriber
// PUT /api/newsletter/:id
// ==================================================

router.put(

    "/:id",

    protect,

    updateSubscriber

);



// ==================================================
// ADMIN ROUTE
// Delete Newsletter subscriber
// DELETE /api/newsletter/:id
// ==================================================

router.delete(

    "/:id",

    protect,

    deleteSubscriber

);



// Export Router
module.exports = router;