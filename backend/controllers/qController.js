const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

// Submit quiz attempt
exports.submitQuiz = async (req, res) => {
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
};

// Get all attempts for a student
exports.getStudentAttempts = async (req, res) => {
    try {
        const { studentId } = req.params;
        const attempts = await QuizAttempt.find({ studentId }).populate('quizId', 'title');
        res.json(attempts);
    } catch (error) {
        console.error("Error fetching quiz attempts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a specific quiz attempt
exports.getQuizAttempt = async (req, res) => {
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
};

// Get a quiz by ID
exports.getQuizById = async (req, res) => {
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
};

// Check if the student has already attempted the quiz
exports.checkQuizAttempt = async (req, res) => {
    try {
        const { studentId, quizId } = req.query;

        if (!studentId || !quizId) {
            return res.status(400).json({ message: "studentId and quizId are required" });
        }

        const existingAttempt = await QuizAttempt.findOne({ studentId, quizId });

        if (existingAttempt) {
            return res.status(200).json({ message: 'Quiz already attempted' });
        } else {
            return res.status(200).json({ message: 'Quiz not attempted yet' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
