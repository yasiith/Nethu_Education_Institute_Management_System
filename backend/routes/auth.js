const express = require('express');
const { registerAdmin, createUser, loginUser, getUser, createStudent } = require('../controllers/authController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Admin routes
router.post('/register-admin', registerAdmin);
router.post('/create-student', auth, checkRole('admin'), createStudent);
router.post('/create-user', auth, checkRole('admin'), createUser);

// Auth routes
router.post('/login', loginUser);

router.get('/user', auth, getUser);  // For the authenticated user
router.get('/user/:id', auth, checkRole('admin'), getUser);

// Test route
router.get('/test', (req, res) => {
    res.json({ msg: 'Test route works' });
});


module.exports = router;
