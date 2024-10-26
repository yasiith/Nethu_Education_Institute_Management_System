const express = require('express');
const User = require('../models/User');
const { registerAdmin, createUser, loginUser, getUser, createStudent, createTeacher,deleteStudent,getStudents } = require('../controllers/authController');
const { updatestudent} = require('../controllers/userupdate');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Admin routes
router.post('/api/auth/register-admin', registerAdmin);
router.post('/api/auth/create-student', auth, checkRole('admin'), createStudent);
router.post('/api/auth/create-teacher', auth, checkRole('admin'), createTeacher);
router.get('/api/auth/viewstudents', auth, checkRole('admin'), getStudents);
router.get('/api/auth/updatesudent',auth,checkRole('admin'),updatestudent);



router.delete('/api/auth/delete-student/:id', auth, checkRole('admin'), deleteStudent);
// Auth routes
router.post('/api/auth/login', loginUser);

router.get('/api/auth/user', auth, getUser);  // For the authenticated user
router.get('/api/auth/user/:id', auth, checkRole('admin'), getUser);

// Test route
router.get('/api/auth/test', (req, res) => {
    res.json({ msg: 'Test route works' });
});




module.exports = router;
