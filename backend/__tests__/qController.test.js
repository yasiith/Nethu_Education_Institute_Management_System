const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

const {
    submitQuiz,
    getStudentAttempts,
    getQuizAttempt,
    getQuizById,
    checkQuizAttempt
} = require('../controllers/qController');

// Mock the models
jest.mock('../models/Quiz');
jest.mock('../models/QuizAttempt');

describe('Quiz Controller Tests', () => {
    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Mock request and response objects
    const mockRequest = (body = {}, params = {}, query = {}) => ({
        body,
        params,
        query
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    describe('submitQuiz', () => {
        test('should successfully submit a quiz', async () => {
            // Setup
            const mockQuizId = 'quiz123';
            const mockStudentId = 'student123';
            const mockClassId = 'class123';
            
            const mockAnswers = [
                { questionId: 'q1', selectedOption: 'A' },
                { questionId: 'q2', selectedOption: 'B' }
            ];
            
            const mockQuiz = {
                _id: mockQuizId,
                questions: [
                    { _id: { toString: () => 'q1' }, text: 'Question 1', options: ['A', 'B', 'C'], correctAnswer: 'A' },
                    { _id: { toString: () => 'q2' }, text: 'Question 2', options: ['A', 'B', 'C'], correctAnswer: 'B' }
                ]
            };
            
            const mockAttempt = {
                _id: 'attempt123',
                save: jest.fn().mockResolvedValue(true)
            };
            
            const req = mockRequest({
                quizId: mockQuizId,
                studentId: mockStudentId,
                answers: mockAnswers,
                classId: mockClassId
            });
            const res = mockResponse();
            
            // Set up mocks
            Quiz.findById.mockResolvedValue(mockQuiz);
            QuizAttempt.mockImplementation(() => mockAttempt);
            
            // Execute
            await submitQuiz(req, res);
            
            // Assert
            expect(Quiz.findById).toHaveBeenCalledWith(mockQuizId);
            expect(QuizAttempt).toHaveBeenCalledWith({
                quizId: mockQuizId,
                studentId: mockStudentId,
                classId: mockClassId,
                score: 2,
                answers: expect.any(Array)
            });
            expect(mockAttempt.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Quiz submitted successfully",
                score: 2,
                attemptId: mockAttempt._id,
                detailedAnswers: expect.any(Array)
            }));
        });

        test('should return 400 when required fields are missing', async () => {
            // Missing studentId
            const req = mockRequest({
                quizId: 'quiz123',
                answers: [],
                classId: 'class123'
            });
            const res = mockResponse();
            
            await submitQuiz(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 
                error: "Missing required fields or invalid data format" 
            });
        });

        test('should return 404 when quiz is not found', async () => {
            const req = mockRequest({
                quizId: 'nonexistent',
                studentId: 'student123',
                answers: [],
                classId: 'class123'
            });
            const res = mockResponse();
            
            Quiz.findById.mockResolvedValue(null);
            
            await submitQuiz(req, res);
            
            expect(Quiz.findById).toHaveBeenCalledWith('nonexistent');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Quiz not found" });
        });

        test('should handle server errors', async () => {
            const req = mockRequest({
                quizId: 'quiz123',
                studentId: 'student123',
                answers: [],
                classId: 'class123'
            });
            const res = mockResponse();
            
            Quiz.findById.mockRejectedValue(new Error('Database error'));
            
            await submitQuiz(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
        });
    });

    describe('getStudentAttempts', () => {
        test('should get all attempts for a student', async () => {
            const mockStudentId = 'student123';
            const mockAttempts = [
                { _id: 'attempt1', quizId: 'quiz1', score: 5 },
                { _id: 'attempt2', quizId: 'quiz2', score: 8 }
            ];
            
            const req = mockRequest({}, { studentId: mockStudentId });
            const res = mockResponse();
            
            QuizAttempt.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockAttempts)
            });
            
            await getStudentAttempts(req, res);
            
            expect(QuizAttempt.find).toHaveBeenCalledWith({ studentId: mockStudentId });
            expect(res.json).toHaveBeenCalledWith(mockAttempts);
        });

        test('should handle server errors', async () => {
            const req = mockRequest({}, { studentId: 'student123' });
            const res = mockResponse();
            
            QuizAttempt.find.mockReturnValue({
                populate: jest.fn().mockRejectedValue(new Error('Database error'))
            });
            
            await getStudentAttempts(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
        });
    });

    describe('getQuizAttempt', () => {
        test('should get a specific quiz attempt', async () => {
            const mockAttemptId = 'attempt123';
            const mockAttempt = {
                _id: mockAttemptId,
                quizId: 'quiz1',
                studentId: 'student1',
                score: 7
            };
            
            const req = mockRequest({}, { attemptId: mockAttemptId });
            const res = mockResponse();
            
            QuizAttempt.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockAttempt)
            });
            
            await getQuizAttempt(req, res);
            
            expect(QuizAttempt.findById).toHaveBeenCalledWith(mockAttemptId);
            expect(res.json).toHaveBeenCalledWith(mockAttempt);
        });

        test('should return 404 when attempt is not found', async () => {
            const mockAttemptId = 'nonexistent';
            const req = mockRequest({}, { attemptId: mockAttemptId });
            const res = mockResponse();
            
            QuizAttempt.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(null)
            });
            
            await getQuizAttempt(req, res);
            
            expect(QuizAttempt.findById).toHaveBeenCalledWith(mockAttemptId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Attempt not found" });
        });

        test('should handle server errors', async () => {
            const req = mockRequest({}, { attemptId: 'attempt123' });
            const res = mockResponse();
            
            QuizAttempt.findById.mockReturnValue({
                populate: jest.fn().mockRejectedValue(new Error('Database error'))
            });
            
            await getQuizAttempt(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
        });
    });

    describe('getQuizById', () => {
        test('should get a quiz by ID', async () => {
            const mockQuizId = 'quiz123';
            const mockQuiz = {
                _id: mockQuizId,
                title: 'Sample Quiz',
                questions: []
            };
            
            const req = mockRequest({}, { quizId: mockQuizId });
            const res = mockResponse();
            
            Quiz.findById.mockResolvedValue(mockQuiz);
            
            await getQuizById(req, res);
            
            expect(Quiz.findById).toHaveBeenCalledWith(mockQuizId);
            expect(res.json).toHaveBeenCalledWith(mockQuiz);
        });

        test('should return 404 when quiz is not found', async () => {
            const mockQuizId = 'nonexistent';
            const req = mockRequest({}, { quizId: mockQuizId });
            const res = mockResponse();
            
            Quiz.findById.mockResolvedValue(null);
            
            await getQuizById(req, res);
            
            expect(Quiz.findById).toHaveBeenCalledWith(mockQuizId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Quiz not found" });
        });

        test('should handle server errors', async () => {
            const req = mockRequest({}, { quizId: 'quiz123' });
            const res = mockResponse();
            
            Quiz.findById.mockRejectedValue(new Error('Database error'));
            
            await getQuizById(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });
    });

    describe('checkQuizAttempt', () => {
        test('should return "already attempted" when student has attempted quiz', async () => {
            const mockStudentId = 'student123';
            const mockQuizId = 'quiz123';
            const mockAttempt = { _id: 'attempt1' };
            
            const req = mockRequest({}, {}, { studentId: mockStudentId, quizId: mockQuizId });
            const res = mockResponse();
            
            QuizAttempt.findOne.mockResolvedValue(mockAttempt);
            
            await checkQuizAttempt(req, res);
            
            expect(QuizAttempt.findOne).toHaveBeenCalledWith({ 
                studentId: mockStudentId, quizId: mockQuizId 
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Quiz already attempted' });
        });

        test('should return "not attempted yet" when student has not attempted quiz', async () => {
            const mockStudentId = 'student123';
            const mockQuizId = 'quiz123';
            
            const req = mockRequest({}, {}, { studentId: mockStudentId, quizId: mockQuizId });
            const res = mockResponse();
            
            QuizAttempt.findOne.mockResolvedValue(null);
            
            await checkQuizAttempt(req, res);
            
            expect(QuizAttempt.findOne).toHaveBeenCalledWith({ 
                studentId: mockStudentId, quizId: mockQuizId 
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Quiz not attempted yet' });
        });

        test('should return 400 when required parameters are missing', async () => {
            // Missing quizId
            const req = mockRequest({}, {}, { studentId: 'student123' });
            const res = mockResponse();
            
            await checkQuizAttempt(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 
                message: 'studentId and quizId are required' 
            });
        });

        test('should handle server errors', async () => {
            const req = mockRequest({}, {}, { 
                studentId: 'student123', 
                quizId: 'quiz123' 
            });
            const res = mockResponse();
            
            QuizAttempt.findOne.mockRejectedValue(new Error('Database error'));
            
            await checkQuizAttempt(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
        });
    });
});