const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Quiz = require('../models/Quiz'); // Corrected model import

const GetquizzesbyClass = async (req, res) => { // Corrected function name and order
  try {
    const { classID } = req.params;

    // Find quizzes by ClassID
    const quizzes = await Quiz.find({ classID });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this class' });
    }

    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { GetquizzesbyClass };
