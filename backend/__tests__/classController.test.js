const mongoose = require('mongoose');
const {
  createclass,
  getAllClasses,
  deleteClass,
  getClassCount,
  getClassesByTeacher,
  getFilteredClasses,
  getClassDetails,
  Getgradesubject,
  getClassesByStudent
} = require('../controllers/classController');
const Class = require('../models/Class');

// Mock dependencies
jest.mock('../models/Class');
jest.mock('mongoose');

describe('Class Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      user: { id: 'teacher123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    console.error = jest.fn(); // Mock console.error
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createclass', () => {
    test('should create a class with valid data and generate classid', async () => {
      // Setup
      req.body = {
        teacherID: 'teacher123',
        grade: '10',
        subject: 'Mathematics',
        date: '2025-05-15T10:00:00Z',
        description: 'Advanced Mathematics',
        privacy: 'public',
        defaultMonthlyFee: 2000,
        year: 2025
      };

      // Mock finding the last class
      Class.findOne.mockReturnValue({
        sort: jest.fn().mockResolvedValue({
          classid: 'C005'
        })
      });

      // Mock saving the new class
      const saveMock = jest.fn().mockResolvedValue();
      Class.mockImplementation(() => ({
        save: saveMock
      }));

      // Execute
      await createclass(req, res);

      // Assert
      expect(Class.findOne).toHaveBeenCalled();
      expect(Class).toHaveBeenCalledWith(expect.objectContaining({
        classid: 'C006',
        grade: '10',
        subject: 'Mathematics',
        monthlyFees: expect.any(Object)
      }));
      expect(saveMock).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 'ok',
        msg: 'Class created successfully',
        classid: 'C006'
      }));
    });

    test('should handle first class creation when no classes exist', async () => {
      // Setup
      req.body = {
        teacherID: 'teacher123',
        grade: '10',
        subject: 'Mathematics',
        date: '2025-05-15T10:00:00Z',
        description: 'Advanced Mathematics',
        privacy: 'public',
        defaultMonthlyFee: 2000,
        year: 2025
      };

      // Mock no classes found
      Class.findOne.mockReturnValue({
        sort: jest.fn().mockResolvedValue(null)
      });

      // Mock saving the new class
      const saveMock = jest.fn().mockResolvedValue();
      Class.mockImplementation(() => ({
        save: saveMock
      }));

      // Execute
      await createclass(req, res);

      // Assert
      expect(Class).toHaveBeenCalledWith(expect.objectContaining({
        classid: 'C001',
      }));
      expect(saveMock).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 'ok',
        classid: 'C001'
      }));
    });

    test('should return 400 when required fields are missing', async () => {
      // Setup - missing subject field
      req.body = {
        teacherID: 'teacher123',
        grade: '10',
        // subject is missing
        date: '2025-05-15T10:00:00Z',
        description: 'Advanced Mathematics',
        privacy: 'public',
        defaultMonthlyFee: 2000,
        year: 2025
      };

      // Execute
      await createclass(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "All fields are required."
      });
    });

    test('should handle server errors during class creation', async () => {
      // Setup
      req.body = {
        teacherID: 'teacher123',
        grade: '10',
        subject: 'Mathematics',
        date: '2025-05-15T10:00:00Z',
        description: 'Advanced Mathematics',
        privacy: 'public',
        defaultMonthlyFee: 2000,
        year: 2025
      };

      // Mock database error
      Class.findOne.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      // Execute
      await createclass(req, res);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });
  });

  describe('getAllClasses', () => {
    test('should return all classes with populated teacher field', async () => {
      // Setup
      const mockClasses = [
        { _id: 'class1', subject: 'Math', grade: '10', teacher: { _id: 'teacher1' } },
        { _id: 'class2', subject: 'Physics', grade: '11', teacher: { _id: 'teacher2' } }
      ];

      Class.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockClasses)
      });

      // Execute
      await getAllClasses(req, res);

      // Assert
      expect(Class.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClasses);
    });

    test('should handle errors when fetching all classes', async () => {
      // Setup
      Class.find.mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('Failed to fetch'))
      });

      // Execute
      await getAllClasses(req, res);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Server error, could not retrieve classes'
      });
    });
  });

  describe('deleteClass', () => {
    test('should delete a class when authorized', async () => {
      // Setup
      req.params = { classId: 'validObjectId' };
      req.user = { id: 'teacher123' };

      // Mock ObjectId validation
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);

      // Mock finding the class
      Class.findById.mockResolvedValue({
        _id: 'validObjectId',
        teacher: 'teacher123',
        toString: () => 'teacher123'
      });

      // Mock deleting the class
      Class.findByIdAndDelete.mockResolvedValue({});

      // Execute
      await deleteClass(req, res);

      // Assert
      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('validObjectId');
      expect(Class.findById).toHaveBeenCalledWith('validObjectId');
      expect(Class.findByIdAndDelete).toHaveBeenCalledWith('validObjectId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Class deleted successfully.' });
    });

    test('should return 400 with invalid class ID', async () => {
      // Setup
      req.params = { classId: 'invalidObjectId' };

      // Mock ObjectId validation
      mongoose.Types.ObjectId.isValid.mockReturnValue(false);

      // Execute
      await deleteClass(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid class ID format.' });
    });

    test('should return 404 when class not found', async () => {
      // Setup
      req.params = { classId: 'validObjectId' };

      // Mock ObjectId validation
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);

      // Mock class not found
      Class.findById.mockResolvedValue(null);

      // Execute
      await deleteClass(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Class not found.' });
    });

    test('should return 403 when not authorized to delete class', async () => {
      // Setup
      req.params = { classId: 'validObjectId' };
      req.user = { id: 'teacher456' }; // Different teacher ID

      // Mock ObjectId validation
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);

      // Mock finding the class with different teacher ID
      Class.findById.mockResolvedValue({
        _id: 'validObjectId',
        teacher: 'teacher123',
        toString: () => 'teacher123'
      });

      // Execute
      await deleteClass(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ message: 'Not authorized to delete this class.' });
    });

    test('should handle mongoose errors during deletion', async () => {
      // Setup
      req.params = { classId: 'validObjectId' };
      req.user = { id: 'teacher123' };

      // Mock ObjectId validation
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);

      // Mock finding the class
      Class.findById.mockResolvedValue({
        _id: 'validObjectId',
        teacher: 'teacher123',
        toString: () => 'teacher123'
      });

      // Mock mongoose error
      const mongooseError = new mongoose.Error('Database error');
      Class.findByIdAndDelete.mockRejectedValue(mongooseError);

      // Execute
      await deleteClass(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Database error.',
        error: 'Database error'
      });
    });
  });

  describe('getClassCount', () => {
    test('should return the total number of classes', async () => {
      // Setup
      Class.countDocuments.mockResolvedValue(10);

      // Execute
      await getClassCount(req, res);

      // Assert
      expect(Class.countDocuments).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ count: 10 });
    });

    test('should handle errors when counting classes', async () => {
      // Setup
      Class.countDocuments.mockRejectedValue(new Error('Count error'));

      // Execute
      await getClassCount(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error retrieving class count'
      }));
    });
  });

  describe('getClassesByTeacher', () => {
    test('should return classes for a specific teacher', async () => {
      // Setup
      req.query = { teacherId: 'teacher123' };
      const mockClasses = [
        { _id: 'class1', subject: 'Math', teacher: 'teacher123' },
        { _id: 'class2', subject: 'Physics', teacher: 'teacher123' }
      ];

      Class.find.mockResolvedValue(mockClasses);

      // Execute
      await getClassesByTeacher(req, res);

      // Assert
      expect(Class.find).toHaveBeenCalledWith({ teacher: 'teacher123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClasses);
    });

    test('should return 400 when teacherId is missing', async () => {
      // Setup
      req.query = {}; // No teacherId

      // Execute
      await getClassesByTeacher(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'TeacherID is required' });
    });

    test('should return 404 when no classes found for teacher', async () => {
      // Setup
      req.query = { teacherId: 'teacher123' };
      Class.find.mockResolvedValue([]);

      // Execute
      await getClassesByTeacher(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'noclassesyet',
        message: 'No classes found for this teacher.'
      });
    });

    test('should handle errors when fetching classes by teacher', async () => {
      // Setup
      req.query = { teacherId: 'teacher123' };
      Class.find.mockRejectedValue(new Error('Database error'));

      // Execute
      await getClassesByTeacher(req, res);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });
  });

  describe('getFilteredClasses', () => {
    test('should return classes filtered by subject', async () => {
      // Setup
      req.query = { subject: 'Mathematics' };
      const mockClasses = [
        { _id: 'class1', subject: 'Mathematics', grade: '10' },
        { _id: 'class2', subject: 'Mathematics', grade: '11' }
      ];

      Class.find.mockResolvedValue(mockClasses);

      // Execute
      await getFilteredClasses(req, res);

      // Assert
      expect(Class.find).toHaveBeenCalledWith({ subject: 'Mathematics' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockClasses
      });
    });

    test('should return classes filtered by grade', async () => {
      // Setup
      req.query = { grade: '10' };
      const mockClasses = [
        { _id: 'class1', subject: 'Mathematics', grade: '10' },
        { _id: 'class2', subject: 'Physics', grade: '10' }
      ];

      Class.find.mockResolvedValue(mockClasses);

      // Execute
      await getFilteredClasses(req, res);

      // Assert
      expect(Class.find).toHaveBeenCalledWith({ grade: '10' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockClasses
      });
    });

    test('should return classes filtered by both subject and grade', async () => {
      // Setup
      req.query = { subject: 'Mathematics', grade: '10' };
      const mockClasses = [
        { _id: 'class1', subject: 'Mathematics', grade: '10' }
      ];

      Class.find.mockResolvedValue(mockClasses);

      // Execute
      await getFilteredClasses(req, res);

      // Assert
      expect(Class.find).toHaveBeenCalledWith({ 
        subject: 'Mathematics', 
        grade: '10' 
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockClasses
      });
    });

    test('should return 404 when no classes match the filter criteria', async () => {
      // Setup
      req.query = { subject: 'Chemistry', grade: '12' };
      Class.find.mockResolvedValue([]);

      // Execute
      await getFilteredClasses(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No classes found for the given subject and grade.'
      });
    });

    test('should handle errors during filtering', async () => {
      // Setup
      req.query = { subject: 'Mathematics' };
      Class.find.mockRejectedValue(new Error('Filter error'));

      // Execute
      await getFilteredClasses(req, res);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Server Error'
      });
    });
  });

  describe('getClassDetails', () => {
    test('should return class details by classId', async () => {
      // Setup
      req.params = { classId: 'C001' };
      const mockClass = {
        _id: 'mongodb_id',
        classid: 'C001',
        grade: '10',
        subject: 'Mathematics'
      };

      // Mock RegExp
      const regExpMock = {
        test: jest.fn().mockReturnValue(true)
      };
      jest.spyOn(global, 'RegExp').mockImplementation(() => regExpMock);

      Class.findOne.mockResolvedValue(mockClass);

      // Execute
      await getClassDetails(req, res);

      // Assert
      expect(Class.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClass);
    });

    test('should return 400 when classId is missing', async () => {
      // Setup
      req.params = {}; // No classId

      // Execute
      await getClassDetails(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Class ID is required' });
    });

    test('should return 404 when class not found', async () => {
      // Setup
      req.params = { classId: 'C999' };
      Class.findOne.mockResolvedValue(null);

      // Execute
      await getClassDetails(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Class with ID C999 not found'
      });
    });

    test('should handle errors when fetching class details', async () => {
      // Setup
      req.params = { classId: 'C001' };
      Class.findOne.mockRejectedValue(new Error('Database error'));

      // Execute
      await getClassDetails(req, res);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error fetching class details'
      }));
    });
  });

  describe('Getgradesubject', () => {
    test('should return all classes with unique grades and subjects', async () => {
      // Setup
      const mockClasses = [
        { grade: '10', subject: 'Mathematics' },
        { grade: '10', subject: 'Physics' },
        { grade: '11', subject: 'Mathematics' }
      ];

      Class.find.mockResolvedValue(mockClasses);

      // Execute
      await Getgradesubject(req, res);

      // Assert
      expect(Class.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        classes: mockClasses,
        uniqueGrades: ['10', '11'],
        uniqueSubjects: ['Mathematics', 'Physics']
      });
    });

    test('should handle errors when fetching grade-subject data', async () => {
      // Setup
      Class.find.mockRejectedValue(new Error('Database error'));

      // Execute
      await Getgradesubject(req, res);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch classes'
      });
    });
  });

  describe('getClassesByStudent', () => {
    test('should return classes for a specific student with unique grades and subjects', async () => {
      // Setup
      req.params = { studentId: 'student123' };
      const mockClasses = [
        { grade: '10', subject: 'Mathematics', students: ['student123'] },
        { grade: '10', subject: 'Physics', students: ['student123'] }
      ];

      Class.find.mockResolvedValue(mockClasses);

      // Execute
      await getClassesByStudent(req, res);

      // Assert
      expect(Class.find).toHaveBeenCalledWith({ students: 'student123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        classes: mockClasses,
        uniqueGrades: ['10'],
        uniqueSubjects: ['Mathematics', 'Physics']
      });
    });

    test('should handle errors when fetching classes by student', async () => {
      // Setup
      req.params = { studentId: 'student123' };
      Class.find.mockRejectedValue(new Error('Database error'));

      // Execute
      await getClassesByStudent(req, res);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch classes for the student'
      });
    });
  });
});