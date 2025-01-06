const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth'); // Middleware for JWT authentication
const { GetquizzesbyClass } = require('../controllers/quizController');

// @route   POST /api/quizzes/create
// @desc    Create a new quiz
// @access  Private (Teacher only)
router.post('/create', auth, async (req, res) => {
  try {
    const { classID, title, description, questions } = req.body;
    const createdBy = req.user.id; // Get the teacher's ID from the JWT token

    if (!classID || !title || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Class ID, Title, and Questions are required' });
    }

    const quiz = new Quiz({
      classID,
      title,
      description,
      questions,
      createdBy, // Add createdBy here
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/class/:classID', auth, GetquizzesbyClass); 

module.exports = router;
