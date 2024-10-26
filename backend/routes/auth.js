const express = require('express');
const User = require('../models/User');
const { registerAdmin, createUser, loginUser, getUser, createStudent, createTeacher,deleteStudent,getStudents } = require('../controllers/authController');
const { updatestudent} = require('../controllers/userupdate');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Admin routes
router.post('/register-admin', registerAdmin);
router.post('/create-student', auth, checkRole('admin'), createStudent);
router.post('/create-teacher', auth, checkRole('admin'), createTeacher);
router.get('/viewstudents', auth, checkRole('admin'), getStudents);
router.get('/updatesudent',auth,checkRole('admin'),updatestudent);



router.delete('/delete-student/:id', auth, checkRole('admin'), deleteStudent);
// Auth routes
router.post('/login', loginUser);

router.get('/user', auth, getUser);  // For the authenticated user
router.get('/user/:id', auth, checkRole('admin'), getUser);

// Test route
router.get('/test', (req, res) => {
    res.json({ msg: 'Test route works' });
});




module.exports = router;
