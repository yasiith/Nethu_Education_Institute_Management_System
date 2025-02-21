// models/QuizAttempt.js
const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    classId: { type: String, required: true },
    studentId: { type: String, ref: 'User', required: true },
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
            selectedOption: { type: String, required: true }
        }
    ],
    score: { type: Number, default: 0 },
    attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizAttempt', QuizAttemptSchema);
