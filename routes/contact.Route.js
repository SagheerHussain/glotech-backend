const express = require('express');
const router = express.Router();

// Import the controller functions
const { createContact, getContacts, getContactById, updateContact, deleteContact } = require('../controllers/contact.Controller');

// Routes for the Contact CRUD operations
router.post('/', createContact); // Create a new contact
router.get('/', getContacts); // Get all contacts
router.get('/get/:id', getContactById); // Get a specific contact by ID
router.put('/update/:id', updateContact); // Update a contact by ID
router.delete('/delete/:id', deleteContact); // Delete a contact by ID

module.exports = router;
