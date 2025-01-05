// routes/quiz.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth'); // Middleware for JWT authentication

// @route   POST /api/quizzes/create
// @desc    Create a new quiz
// @access  Private (Teacher only)
router.post('/create', auth, async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        // Validate required fields
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Title and questions are required.' });
        }

        // Validate questions format (each question must have 4 options)
        if (questions.some(q => q.options.length !== 4)) {
            return res.status(400).json({ message: 'Each question must have 4 options' });
        }

        // Create new quiz
        const newQuiz = new Quiz({
            title,
            description,
            questions,
            createdBy: req.user.id // Extracted from the token using auth middleware
        });

        await newQuiz.save();

        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        console.error('Error creating quiz:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
