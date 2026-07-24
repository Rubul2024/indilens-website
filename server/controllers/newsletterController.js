const Newsletter = require("../models/Newsletter");


// ==================================================
// 1. PUBLIC - SUBSCRIBE TO NEWSLETTER
// POST /api/newsletter
// ==================================================

const subscribeNewsletter = async (req, res) => {

    try {

        // Get email from frontend
        const { email } = req.body;


        // Check if email is provided
        if (!email) {

            return res.status(400).json({

                success: false,

                message: "Email address is required."

            });

        }


        // Clean email
        const cleanEmail = email
            .trim()
            .toLowerCase();


        // Check basic email format
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(cleanEmail)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email address."

            });

        }


        // Check if email already exists
        const existingSubscriber =
            await Newsletter.findOne({

                email: cleanEmail

            });


        if (existingSubscriber) {

            return res.status(409).json({

                success: false,

                message:
                    "This email is already subscribed."

            });

        }


        // Create new subscriber
        const subscriber =
            await Newsletter.create({

                email: cleanEmail

            });


        // Send success response
        return res.status(201).json({

            success: true,

            message:
                "Successfully subscribed to the newsletter.",

            data: {

                id: subscriber._id,

                email: subscriber.email

            }

        });


    } catch (error) {

        console.error(
            "Newsletter Subscription Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to subscribe at this time."

        });

    }

};



// ==================================================
// 2. ADMIN - GET ALL SUBSCRIBERS
// GET /api/newsletter
// ==================================================

const getAllSubscribers = async (req, res) => {

    try {

        const subscribers =
            await Newsletter.find()
                .sort({
                    createdAt: -1
                });


        return res.status(200).json({

            success: true,

            count: subscribers.length,

            data: subscribers

        });


    } catch (error) {

        console.error(
            "Get Newsletter Subscribers Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to get newsletter subscribers."

        });

    }

};



// ==================================================
// 3. ADMIN - GET ONE SUBSCRIBER
// GET /api/newsletter/:id
// ==================================================

const getSubscriberById = async (req, res) => {

    try {

        const subscriber =
            await Newsletter.findById(
                req.params.id
            );


        // Subscriber not found
        if (!subscriber) {

            return res.status(404).json({

                success: false,

                message:
                    "Newsletter subscriber not found."

            });

        }


        return res.status(200).json({

            success: true,

            data: subscriber

        });


    } catch (error) {

        console.error(
            "Get Subscriber Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to get subscriber."

        });

    }

};



// ==================================================
// 4. ADMIN - UPDATE SUBSCRIBER STATUS
// PUT /api/newsletter/:id
// ==================================================

const updateSubscriber = async (req, res) => {

    try {

        // Get isActive from request body
        const { isActive } = req.body;


        // Find subscriber
        const subscriber =
            await Newsletter.findById(
                req.params.id
            );


        // Check subscriber
        if (!subscriber) {

            return res.status(404).json({

                success: false,

                message:
                    "Newsletter subscriber not found."

            });

        }


        // Update status
        subscriber.isActive = isActive;


        // Save changes
        await subscriber.save();


        return res.status(200).json({

            success: true,

            message:
                "Subscriber status updated successfully.",

            data: subscriber

        });


    } catch (error) {

        console.error(
            "Update Subscriber Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update subscriber."

        });

    }

};



// ==================================================
// 5. ADMIN - DELETE SUBSCRIBER
// DELETE /api/newsletter/:id
// ==================================================

const deleteSubscriber = async (req, res) => {

    try {

        // Find subscriber
        const subscriber =
            await Newsletter.findById(
                req.params.id
            );


        // Check subscriber
        if (!subscriber) {

            return res.status(404).json({

                success: false,

                message:
                    "Newsletter subscriber not found."

            });

        }


        // Delete subscriber
        await Newsletter.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Newsletter subscriber deleted successfully."

        });


    } catch (error) {

        console.error(
            "Delete Subscriber Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete subscriber."

        });

    }

};



// ==================================================
// EXPORT ALL FUNCTIONS
// ==================================================

module.exports = {

    subscribeNewsletter,

    getAllSubscribers,

    getSubscriberById,

    updateSubscriber,

    deleteSubscriber

};