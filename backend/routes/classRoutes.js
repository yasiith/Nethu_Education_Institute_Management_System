const express = require('express');
const router = express.Router();
const { getAllClasses, createclass,getClassesByTeacher,getFilteredClasses  } = require('../controllers/classController');

// Define the GET route for fetching all classes
router.get('/api/classes', getAllClasses);

router.get('/api/classes/getClassesByTeacher', getClassesByTeacher);


// Define the POST route for creating a new class
router.post('/api/classes/createclass', createclass);

// Route to filter classes by subject and grade
router.get('/api/classes/filter', getFilteredClasses);

getClassesByTeacher
module.exports = router;
