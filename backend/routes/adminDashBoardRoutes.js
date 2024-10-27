const express = require('express');
const { getClassCount } = require('../controllers/adminDashBoarController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { getStudentCount, getTeacherCount } = require('../controllers/adminDashBoarController'); // Adjust the path if needed


const router = express.Router();



router.get('/api/class-count', getClassCount); // Class count
router.get('/api/student-count',getStudentCount); // student count
router.get('/api/teacher-count',getTeacherCount); // teacher count


module.exports = router;
