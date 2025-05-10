const { getClassCount, getStudentCount, getTeacherCount } = require('../controllers/adminDashBoarController');
const Class = require('../models/Class');
const User = require('../models/User');

// Mock the MongoDB models
jest.mock('../models/Class');
jest.mock('../models/User');

describe('Admin Dashboard Controller', () => {
  // Setup for response object mocking
  let req, res;
  
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getClassCount', () => {
    test('should return the count of classes', async () => {
      // Mock the countDocuments method
      Class.countDocuments.mockResolvedValueOnce(10);
      
      // Call the function
      await getClassCount(req, res);
      
      // Assert the response
      expect(Class.countDocuments).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ classCount: 10 });
    });

    test('should handle errors correctly', async () => {
      // Mock the countDocuments method to throw an error
      const errorMessage = 'Database error';
      Class.countDocuments.mockRejectedValueOnce(new Error(errorMessage));
      
      // Call the function
      await getClassCount(req, res);
      
      // Assert the response
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Error retrieving class count'
        })
      );
    });
  });

  describe('getStudentCount', () => {
    test('should return the count of students', async () => {
      // Mock the countDocuments method
      User.countDocuments.mockResolvedValueOnce(25);
      
      // Call the function
      await getStudentCount(req, res);
      
      // Assert the response
      expect(User.countDocuments).toHaveBeenCalledWith({ role: 'student' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ studentCount: 25 });
    });

    test('should handle errors correctly', async () => {
      // Mock the countDocuments method to throw an error
      const errorMessage = 'Database error';
      User.countDocuments.mockRejectedValueOnce(new Error(errorMessage));
      
      // Call the function
      await getStudentCount(req, res);
      
      // Assert the response
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Error retrieving student count'
        })
      );
    });
  });

  describe('getTeacherCount', () => {
    test('should return the count of teachers', async () => {
      // Mock the countDocuments method
      User.countDocuments.mockResolvedValueOnce(5);
      
      // Call the function
      await getTeacherCount(req, res);
      
      // Assert the response
      expect(User.countDocuments).toHaveBeenCalledWith({ role: 'teacher' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ teacherCount: 5 });
    });

    test('should handle errors correctly', async () => {
      // Mock the countDocuments method to throw an error
      const errorMessage = 'Database error';
      User.countDocuments.mockRejectedValueOnce(new Error(errorMessage));
      
      // Call the function
      await getTeacherCount(req, res);
      
      // Assert the response
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Error retrieving teacher count'
        })
      );
    });
  });
});