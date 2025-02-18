//backend\controllers\quizController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Quiz = require('../models/Quiz'); // Corrected model import

// @desc Get all quizzes by ClassID
// @route GET /api/quizzes/class/:classID
// @access Private (Teacher/Student)
const GetquizzesbyClassAndMonth = async (req, res) => {
  try {
    const { classID, month } = req.params; // Extracting classID and month from request parameters

    // Find quizzes by classID and month
    const quizzes = await Quiz.find({ classID, month });


    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
  }
};


// @desc Get a specific quiz by ID
// @route GET /api/quizzes/class/:classId/quizzes/:quizId
// @access Private (Teacher/Student)
const getQuizById = async (req, res) => {
  try {
    const { classId, quizId } = req.params;

    // Find a specific quiz by ID and classId
    const quiz = await Quiz.findOne({ _id: quizId, classID: classId });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz', error: error.message });
  }
};

// @desc Create a new quiz
// @route POST /api/quizzes/create
// @access Private (Teacher only)
const createQuiz = async (req, res) => {
  try {
    const { classID, title, description, questions, month } = req.body;
    const createdBy = req.user.id; // Get the teacher's ID from the JWT token

    if (!classID || !title || !questions || !month || questions.length === 0) {
      return res.status(400).json({ message: 'Class ID, Title, and Questions are required' });
    }

    const quiz = new Quiz({
      classID,
      title,
      description,
      questions,
      createdBy,
      month,
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create quiz', error: err.message });
  }
};

module.exports = { GetquizzesbyClassAndMonth, getQuizById, createQuiz };