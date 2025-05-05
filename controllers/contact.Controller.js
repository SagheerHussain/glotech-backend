const Contact = require("../models/Contact.Model");

// Create Contact - Adds a new contact
const createContact = async (req, res) => {
  try {
    const { location_en, location_ar, location_fr, email, phone } = req.body;

    if (!location_en || !location_ar || !location_fr || !email || !phone) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const newContact = new Contact({
      location: { en: location_en, ar: location_ar, fr: location_fr },
      email,
      phone,
    });

    await newContact.save();
    return res
      .status(201)
      .json({
        message: "Contact created successfully",
        data: newContact,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating contact", success: false });
  }
};

// Get all Contacts - Retrieves all contact details
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (contacts.length === 0) {
      return res
        .status(404)
        .json({ message: "No contact found", success: false });
    }
    return res
      .status(200)
      .json({
        data: contacts,
        message: "Contacts fetched successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching contacts", success: false });
  }
};

// Get a specific Contact - Retrieves a contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById({ _id: id });

    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }

    return res
      .status(200)
      .json({
        data: contact,
        message: "Contact fetched successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching contact", success: false });
  }
};

// Update Contact - Updates contact details by ID
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { location_en, location_ar, location_fr, email, phone } = req.body;

    if (!location_en || !location_ar || !location_fr || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          location: { en: location_en, ar: location_ar, fr: location_fr },
          email,
          phone,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }

    return res.status(200).json({
      message: "Contact updated successfully",
      data: updatedContact,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating contact", success: false });
  }
};

// Delete Contact - Deletes a specific contact by ID
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete({ _id: id });

    if (!deletedContact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Contact deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting contact" });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
