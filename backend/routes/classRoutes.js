const express = require('express');
const router = express.Router();
const { getAllClasses, createclass,getClassesByTeacher } = require('../controllers/classController');

// Define the GET route for fetching all classes
router.get('/api/classes', getAllClasses);

router.get('/api/classes/getClassesByTeacher', getClassesByTeacher);


// Define the POST route for creating a new class
router.post('/api/classes/createclass', createclass);

getClassesByTeacher
module.exports = router;
