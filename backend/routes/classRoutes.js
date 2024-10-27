const express = require('express');
const router = express.Router();
const { getAllClasses } = require('../controllers/classController');

// Define the GET route for fetching all classes
router.get('/api/classes', getAllClasses);

module.exports = router;
