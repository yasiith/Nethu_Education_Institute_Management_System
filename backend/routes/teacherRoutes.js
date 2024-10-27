const express = require('express');
const {createClass,deleteClass} = require('../controllers/classController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// Route to create a new class
router.post('/api/teacher/create-class',auth, checkRole('teacher'), createClass);

// Route to delete a class
router.delete('/api/teacher/delete-class/:classId', auth, checkRole('teacher'), deleteClass);


module.exports = router;