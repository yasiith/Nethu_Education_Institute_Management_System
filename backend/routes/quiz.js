//backend\routes\quiz.js
const quizController = require('../controllers/qController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware for JWT authentication
const { GetquizzesbyClassAndMonth, getQuizById, createQuiz } = require('../controllers/quizController');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

// @route POST /api/quizzes/create
// @desc Create a new quiz
// @access Private (Teacher only)
router.post('/create', auth, createQuiz);

// @route GET /api/quizzes/class/:classID
// @desc Get all quizzes by classID
// @access Private (Teacher/Student)
router.get('/class/:classID/:month', GetquizzesbyClassAndMonth);

// @route GET /api/quizzes/class/:classId/quizzes/:quizId
// @desc Get a specific quiz by ID
// @access Private (Teacher/Student)
router.get('/class/:classId/quizzes/:quizId', auth, getQuizById);


// Define routes using the controller
router.post('/submit', quizController.submitQuiz);
router.get('/student/:studentId', quizController.getStudentAttempts);
router.get('/attempt/:attemptId', quizController.getQuizAttempt);
router.get('/quize/:quizId', quizController.getQuizById);
router.get('/check-attempt', quizController.checkQuizAttempt);


module.exports = router;
