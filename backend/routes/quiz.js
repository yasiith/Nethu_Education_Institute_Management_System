//backend\routes\quiz.js

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


router.post('/submit', async (req, res) => {
    try {
        const { quizId, studentId, answers, classId } = req.body;

        if (!quizId || !studentId || !answers || !classId || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Missing required fields or invalid data format" });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        let score = 0;
        const detailedAnswers = answers.map((attempt) => {
            const question = quiz.questions.find(q => q._id.toString() === attempt.questionId);
            if (question) {
                const isCorrect = question.correctAnswer === attempt.selectedOption;
                if (isCorrect) {
                    score += 1;
                }
                return {
                    questionId: question._id,
                    questionText: question.text,
                    options: question.options,
                    selectedOption: attempt.selectedOption,
                    correctAnswer: question.correctAnswer,
                    isCorrect
                };
            }
            return null;
        }).filter(Boolean);

        const attempt = new QuizAttempt({
            quizId,
            studentId,
            answers: detailedAnswers,
            score,
            classId
        });

        await attempt.save();

        // Return detailed answers with additional info
        res.status(201).json({
            message: "Quiz submitted successfully",
            score,
            attemptId: attempt._id,
            detailedAnswers
        });

    } catch (error) {
        console.error("Error submitting quiz:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Get all attempts for a student
router.get('/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const attempts = await QuizAttempt.find({ studentId }).populate('quizId', 'title');
        res.json(attempts);
    } catch (error) {
        console.error("Error fetching quiz attempts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a specific quiz attempt
router.get('/attempt/:attemptId', async (req, res) => {
    try {
        const { attemptId } = req.params;
        const attempt = await QuizAttempt.findById(attemptId).populate('quizId', 'title');
        if (!attempt) {
            return res.status(404).json({ error: "Attempt not found" });
        }
        res.json(attempt);
    } catch (error) {
        console.error("Error fetching attempt:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Get a quiz by ID
router.get("/quize/:quizId", async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await Quiz.findById(quizId);
  
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
  
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Check if the student has already attempted the quiz
router.get('/check-attempt', async (req, res) => {
    const { studentId, quizId } = req.query;

    if (!studentId || !quizId) {
        return res.status(400).json({ message: "studentId and quizId are required" });
    }

    try {
        // Find a quiz attempt by the student for the specific quiz
        const existingAttempt = await QuizAttempt.findOne({ studentId, quizId });

        if (existingAttempt) {
            return res.status(200).json({ message: 'Quiz already attempted' });
        } else {
            return res.status(200).json({ message: 'Quiz not attempted yet' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
