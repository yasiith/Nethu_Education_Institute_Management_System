const { loginUser } = require('../controllers/authController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Login User Tests', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock request and response objects
  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test('should login successfully as a teacher', async () => {
    // Setup
    const req = mockRequest({
      email: 'teacher@example.com',
      password: 'password123'
    });
    const res = mockResponse();
    
    // Mock user found in database
    const mockUser = {
      id: 'user123',
      email: 'teacher@example.com',
      password: 'hashedPassword',
      role: 'teacher',
      TeacherID: 'T123'
    };
    
    // Mock database query
    User.findOne.mockResolvedValue(mockUser);
    
    // Mock password comparison
    bcrypt.compare.mockResolvedValue(true);
    
    // Mock JWT sign
    jwt.sign.mockImplementation((payload, secret, options, callback) => {
      callback(null, 'fake-token');
    });
    
    // Execute
    await loginUser(req, res);
    
    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'teacher@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      status: "ok",
      data: 'fake-token',
      type: 'teacher',
      TeacherID: 'T123'
    });
  });

  test('should login successfully as a student', async () => {
    // Setup
    const req = mockRequest({
      email: 'student@example.com',
      password: 'password123'
    });
    const res = mockResponse();
    
    // Mock user found in database
    const mockUser = {
      id: 'user456',
      _id: 'mongo123',
      email: 'student@example.com',
      name: 'Test Student',
      password: 'hashedPassword',
      role: 'student',
      StudentID: 'S123'
    };
    
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    
    jwt.sign.mockImplementation((payload, secret, options, callback) => {
      callback(null, 'fake-token');
    });
    
    // Execute
    await loginUser(req, res);
    
    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'student@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      status: "ok",
      data: 'fake-token',
      type: 'student',
      StudentID: 'S123',
      MongoID: 'mongo123',
      name: 'Test Student'
    });
  });

  test('should login successfully as an admin', async () => {
    // Setup
    const req = mockRequest({
      email: 'admin@example.com',
      password: 'password123'
    });
    const res = mockResponse();
    
    // Mock user found in database
    const mockUser = {
      id: 'user789',
      email: 'admin@example.com',
      password: 'hashedPassword',
      role: 'admin'
    };
    
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    
    jwt.sign.mockImplementation((payload, secret, options, callback) => {
      callback(null, 'fake-token');
    });
    
    // Execute
    await loginUser(req, res);
    
    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'admin@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      status: "ok",
      data: 'fake-token',
      type: 'admin'
    });
  });

  test('should return error if user not found', async () => {
    // Setup
    const req = mockRequest({
      email: 'nonexistent@example.com',
      password: 'password123'
    });
    const res = mockResponse();
    
    // Mock user not found
    User.findOne.mockResolvedValue(null);
    
    // Execute
    await loginUser(req, res);
    
    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Credentials' });
  });

  test('should return error if password does not match', async () => {
    // Setup
    const req = mockRequest({
      email: 'user@example.com',
      password: 'wrongPassword'
    });
    const res = mockResponse();
    
    // Mock user found
    const mockUser = {
      id: 'user123',
      email: 'user@example.com',
      password: 'hashedPassword',
      role: 'teacher'
    };
    User.findOne.mockResolvedValue(mockUser);
    
    // Mock password not matching
    bcrypt.compare.mockResolvedValue(false);
    
    // Execute
    await loginUser(req, res);
    
    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Credentials' });
  });

  test('should handle server error', async () => {
    // Setup
    const req = mockRequest({
      email: 'user@example.com',
      password: 'password123'
    });
    const res = mockResponse();
    
    // Mock database error
    User.findOne.mockRejectedValue(new Error('Database error'));
    
    // Execute
    await loginUser(req, res);
    
    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Server error');
  });
});
