const express = require('express');
const router = express.Router();
const { getAllClasses, createclass,getClassesByTeacher,getFilteredClasses ,getClassDetails, Getgradesubject } = require('../controllers/classController');

// Define the GET route for fetching all classes
router.get('/api/classes', getAllClasses);

router.get('/api/classes/getClassesByTeacher', getClassesByTeacher);


// Define the POST route for creating a new class
router.post('/api/classes/createclass', createclass);

// Route to filter classes by subject and grade
router.get('/api/classes/filter', getFilteredClasses);

//get class subject grade
router.get('/api/classes/Getgradesubject', Getgradesubject);

// GET /api/classes/:classId - Retrieve class details by class ID
router.get('/api/classes/:classId', getClassDetails); // Use the controller function here





getClassesByTeacher
module.exports = router;
