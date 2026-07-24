const Contact = require("../models/Contact");


// ==========================================
// CREATE CONTACT MESSAGE
// POST /api/contact
// ==========================================

const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and phone number are required.",
      });
    }

    // Create contact message
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message:
        "Message sent successfully!",
      data: contact,
    });

  } catch (error) {
    console.error(
      "Create Contact Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to send message.",
    });
  }
};


// ==========================================
// GET ALL CONTACT MESSAGES
// GET /api/contact
// ==========================================

const getAllContacts = async (req, res) => {
  try {

    const contacts =
      await Contact.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });

  } catch (error) {

    console.error(
      "Get Contacts Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch contact messages.",
    });

  }
};


// ==========================================
// GET SINGLE CONTACT MESSAGE
// GET /api/contact/:id
// ==========================================

const getContactById = async (req, res) => {
  try {

    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {

      return res.status(404).json({
        success: false,
        message:
          "Contact message not found.",
      });

    }

    res.status(200).json({
      success: true,
      data: contact,
    });

  } catch (error) {

    console.error(
      "Get Contact Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch contact message.",
    });

  }
};


// ==========================================
// UPDATE CONTACT MESSAGE
// PUT /api/contact/:id
// ==========================================

const updateContact = async (req, res) => {
  try {

    const {
      status,
    } = req.body;

    const contact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!contact) {

      return res.status(404).json({
        success: false,
        message:
          "Contact message not found.",
      });

    }

    res.status(200).json({
      success: true,
      message:
        "Contact status updated successfully.",
      data: contact,
    });

  } catch (error) {

    console.error(
      "Update Contact Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update contact message.",
    });

  }
};


// ==========================================
// DELETE CONTACT MESSAGE
// DELETE /api/contact/:id
// ==========================================

const deleteContact = async (req, res) => {
  try {

    const contact =
      await Contact.findByIdAndDelete(
        req.params.id
      );

    if (!contact) {

      return res.status(404).json({
        success: false,
        message:
          "Contact message not found.",
      });

    }

    res.status(200).json({
      success: true,
      message:
        "Contact message deleted successfully.",
    });

  } catch (error) {

    console.error(
      "Delete Contact Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to delete contact message.",
    });

  }
};


module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};