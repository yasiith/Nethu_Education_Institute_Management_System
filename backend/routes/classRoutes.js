const express = require('express');
const router = express.Router();
const { getAllClasses, createclass } = require('../controllers/classController');

// Define the GET route for fetching all classes
router.get('/api/classes', getAllClasses);

// Define the POST route for creating a new class
router.post('/api/classes/createclass', createclass);

module.exports = router;
