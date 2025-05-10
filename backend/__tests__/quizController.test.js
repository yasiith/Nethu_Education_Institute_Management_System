const Quiz = require('../models/Quiz');
const { createQuiz } = require('../controllers/quizController');

// Mock the Quiz model
jest.mock('../models/Quiz');

describe('Quiz Controller Tests - createQuiz', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock request and response objects
  const mockRequest = (body = {}, params = {}, user = {}) => ({
    body,
    params,
    user
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('createQuiz', () => {
    test('should successfully create a quiz', async () => {
      // Setup mock data
      const mockClassID = 'class123';
      const mockTitle = 'Test Quiz';
      const mockDescription = 'This is a test quiz';
      const mockQuestions = [
        { 
          text: 'What is 1+1?', 
          options: ['1', '2', '3', '4'], 
          correctAnswer: '2' 
        },
        { 
          text: 'What is the capital of France?', 
          options: ['Berlin', 'London', 'Paris', 'Madrid'], 
          correctAnswer: 'Paris' 
        }
      ];
      const mockMonth = 'January';
      const mockTeacherId = 'teacher123';
      
      const mockSavedQuiz = {
        _id: 'quiz123',
        classID: mockClassID,
        title: mockTitle,
        description: mockDescription,
        questions: mockQuestions,
        createdBy: mockTeacherId,
        month: mockMonth
      };
      
      // Mock the request with the required data
      const req = mockRequest(
        {
          classID: mockClassID,
          title: mockTitle,
          description: mockDescription,
          questions: mockQuestions,
          month: mockMonth
        },
        {},
        { id: mockTeacherId }
      );
      
      const res = mockResponse();
      
      // Mock Quiz constructor and save method
      const mockQuizInstance = {
        save: jest.fn().mockResolvedValue(mockSavedQuiz)
      };
      
      Quiz.mockImplementation(() => mockQuizInstance);
      
      // Execute the controller function
      await createQuiz(req, res);
      
      // Assertions
      expect(Quiz).toHaveBeenCalledWith({
        classID: mockClassID,
        title: mockTitle,
        description: mockDescription,
        questions: mockQuestions,
        createdBy: mockTeacherId,
        month: mockMonth
      });
      
      expect(mockQuizInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Quiz created successfully',
        quiz: mockQuizInstance
      });
    });

    test('should return 400 when required fields are missing - no title', async () => {
      // Missing title
      const req = mockRequest(
        {
          classID: 'class123',
          description: 'Quiz description',
          questions: [{ text: 'Question 1', options: ['A', 'B'], correctAnswer: 'A' }],
          month: 'January'
        },
        {},
        { id: 'teacher123' }
      );
      
      const res = mockResponse();
      
      await createQuiz(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Class ID, Title, and Questions are required' 
      });
    });

    test('should return 400 when required fields are missing - no classID', async () => {
      // Missing classID
      const req = mockRequest(
        {
          title: 'Test Quiz',
          description: 'Quiz description',
          questions: [{ text: 'Question 1', options: ['A', 'B'], correctAnswer: 'A' }],
          month: 'January'
        },
        {},
        { id: 'teacher123' }
      );
      
      const res = mockResponse();
      
      await createQuiz(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Class ID, Title, and Questions are required' 
      });
    });

    test('should return 400 when required fields are missing - no questions', async () => {
      // Missing questions
      const req = mockRequest(
        {
          classID: 'class123',
          title: 'Test Quiz',
          description: 'Quiz description',
          month: 'January'
        },
        {},
        { id: 'teacher123' }
      );
      
      const res = mockResponse();
      
      await createQuiz(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Class ID, Title, and Questions are required' 
      });
    });

    test('should return 400 when required fields are missing - empty questions array', async () => {
      // Empty questions array
      const req = mockRequest(
        {
          classID: 'class123',
          title: 'Test Quiz',
          description: 'Quiz description',
          questions: [],
          month: 'January'
        },
        {},
        { id: 'teacher123' }
      );
      
      const res = mockResponse();
      
      await createQuiz(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Class ID, Title, and Questions are required' 
      });
    });

    test('should return 400 when required fields are missing - no month', async () => {
      // Missing month
      const req = mockRequest(
        {
          classID: 'class123',
          title: 'Test Quiz',
          description: 'Quiz description',
          questions: [{ text: 'Question 1', options: ['A', 'B'], correctAnswer: 'A' }]
        },
        {},
        { id: 'teacher123' }
      );
      
      const res = mockResponse();
      
      await createQuiz(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Class ID, Title, and Questions are required' 
      });
    });

    test('should handle server errors when saving quiz fails', async () => {
      const req = mockRequest(
        {
          classID: 'class123',
          title: 'Test Quiz',
          description: 'Quiz description',
          questions: [{ text: 'Question 1', options: ['A', 'B'], correctAnswer: 'A' }],
          month: 'January'
        },
        {},
        { id: 'teacher123' }
      );
      
      const res = mockResponse();
      
      // Mock quiz save method to throw an error
      const mockQuizInstance = {
        save: jest.fn().mockRejectedValue(new Error('Database error'))
      };
      
      Quiz.mockImplementation(() => mockQuizInstance);
      
      await createQuiz(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Failed to create quiz', 
        error: 'Database error' 
      });
    });
  });
});