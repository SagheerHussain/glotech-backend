const Contact = require("../models/Contact.Model");

// Create Contact - Adds a new contact
const createContact = async (req, res) => {
  try {
    const { location, email, phone } = req.body;

    if (!location || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      location: {
        en: location.en,
        ar: location.ar,
        fr: location.fr,
      },
      email,
      phone,
    });

    await newContact.save();
    return res
      .status(201)
      .json({ message: "Contact created successfully", newContact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating contact" });
  }
};

// Get all Contacts - Retrieves all contact details
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contact found" });
    }
    return res.json(contacts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching contacts" });
  }
};

// Get a specific Contact - Retrieves a contact by ID
const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById({ _id: id });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching contact" });
  }
};

// Update Contact - Updates contact details by ID
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, email, phone } = req.body;

    if (!location || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      {},
      {
        $set: {
          location: {
            en: location.en,
            ar: location.ar,
            fr: location.fr,
          },
          email,
          phone,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json({
      message: "Contact updated successfully",
      updatedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating contact" });
  }
};

// Delete Contact - Deletes a specific contact by ID
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete();

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting contact" });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
