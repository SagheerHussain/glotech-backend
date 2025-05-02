const express = require('express');
const router = express.Router();
const { createAbout, getAboutLists, getAbout, updateAbout, deleteAbout } = require('../controllers/about.Controller');

// Route to create About data
router.post('/', createAbout);

// Route to get About data
router.get('/', getAboutLists);

// Route to get About data
router.get('/get/:id', getAbout);

// Route to update About data
router.put('/update/:id', updateAbout);

// Route to delete About data
router.delete('/delete/:id', deleteAbout);

module.exports = router;
