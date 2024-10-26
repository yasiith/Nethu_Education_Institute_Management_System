const express = require('express');
const {createClass} = require('../controllers/classController');
const validateClass = require('../middleware/validateClass');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// Route to create a new class
router.post('/create',auth, checkRole('teacher'), validateClass, createClass);

module.exports = router;