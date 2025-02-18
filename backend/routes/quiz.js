//backend\routes\quiz.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware for JWT authentication
const { GetquizzesbyClassAndMonth, getQuizById, createQuiz } = require('../controllers/quizController');

// @route POST /api/quizzes/create
// @desc Create a new quiz
// @access Private (Teacher only)
router.post('/create', auth, createQuiz);

// @route GET /api/quizzes/class/:classID
// @desc Get all quizzes by classID
// @access Private (Teacher/Student)
router.get('/class/:classID/:month', auth, GetquizzesbyClassAndMonth);

// @route GET /api/quizzes/class/:classId/quizzes/:quizId
// @desc Get a specific quiz by ID
// @access Private (Teacher/Student)
router.get('/class/:classId/quizzes/:quizId', auth, getQuizById);

module.exports = router;
