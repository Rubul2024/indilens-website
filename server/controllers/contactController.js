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

    const asText = (value, max) =>
      typeof value === "string" ? value.trim().slice(0, max) : "";

    const clean = {
      name: asText(name, 100),
      email: asText(email, 150).toLowerCase(),
      phone: asText(phone, 30),
      subject: asText(subject, 200),
      message: asText(message, 5000),
    };

    // Validate required fields
    if (!clean.name || !clean.email || !clean.phone) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and phone number are required.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Create contact message
    await Contact.create(clean);

    return res.status(201).json({
      success: true,
      message:
        "Message sent successfully!",
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

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be new, read or replied.",
      });
    }

    const contact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          returnDocument: "after",
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