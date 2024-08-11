const express = require('express');
const { registerAdmin, createUser, loginUser, getUser } = require('../controllers/authController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Admin routes
router.post('/register-admin', registerAdmin);
router.post('/create-user', auth, checkRole('admin'), createUser);

// Auth routes
router.post('/login', loginUser);
router.get('/user', auth, getUser);

module.exports = router;
