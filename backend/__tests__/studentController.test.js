const { enrollInClass, checkEnrollmentStatus, unenrollFromClass } = require('../../controllers/studentController');
const Class = require('../../models/Class');

// Mock the Class model
jest.mock('../../models/Class');

describe('Student Controller', () => {
  let req, res;
  
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
    
    // Setup request and response objects
    req = {
      params: { classId: 'TEST123' },
      user: { 
        id: 'user123',
        StudentID: 'student123'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  describe('enrollInClass', () => {
    it('should enroll a student in a class successfully', async () => {
      // Mock class data
      const mockClass = {
        classid: 'TEST123',
        students: ['student456'],
        save: jest.fn().mockResolvedValue(true)
      };
      
      // Mock the findOne implementation
      Class.findOne.mockResolvedValue(mockClass);
      
      await enrollInClass(req, res);
      
      // Verify the student ID was added to the class
      expect(mockClass.students).toContain('student123');
      expect(mockClass.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Successfully enrolled in the class.",
          class: mockClass
        })
      );
    });

    it('should return 404 if class is not found', async () => {
      // Mock class not found
      Class.findOne.mockResolvedValue(null);
      
      await enrollInClass(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "Class not found." });
    });

    it('should return 400 if student is already enrolled', async () => {
      // Mock class with student already enrolled
      const mockClass = {
        classid: 'TEST123',
        students: ['student123']
      };
      
      Class.findOne.mockResolvedValue(mockClass);
      
      await enrollInClass(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: "Already enrolled in this class." });
    });

    it('should handle errors properly', async () => {
      // Mock an error during database operation
      Class.findOne.mockRejectedValue(new Error('Database error'));
      
      await enrollInClass(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Error enrolling in class.",
          error: "Database error"
        })
      );
    });
  });

  describe('checkEnrollmentStatus', () => {
    it('should return true if student is enrolled', async () => {
      // Mock class with student enrolled
      const mockClass = {
        classid: 'TEST123',
        students: ['student123']
      };
      
      Class.findOne.mockResolvedValue(mockClass);
      
      await checkEnrollmentStatus(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ isEnrolled: true });
    });

    it('should return false if student is not enrolled', async () => {
      // Mock class with student not enrolled
      const mockClass = {
        classid: 'TEST123',
        students: ['student456']
      };
      
      Class.findOne.mockResolvedValue(mockClass);
      
      await checkEnrollmentStatus(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ isEnrolled: false });
    });

    it('should return 404 if class is not found', async () => {
      // Mock class not found
      Class.findOne.mockResolvedValue(null);
      
      await checkEnrollmentStatus(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "Class not found." });
    });

    it('should handle errors properly', async () => {
      // Mock an error during database operation
      Class.findOne.mockRejectedValue(new Error('Database error'));
      
      await checkEnrollmentStatus(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Error checking enrollment status.",
          error: "Database error"
        })
      );
    });
  });

  describe('unenrollFromClass', () => {
    it('should unenroll a student from a class successfully', async () => {
      // Mock class with student enrolled
      const mockClass = {
        classid: 'TEST123',
        students: ['student123', 'student456'],
        save: jest.fn().mockResolvedValue(true)
      };
      
      Class.findOne.mockResolvedValue(mockClass);
      
      await unenrollFromClass(req, res);
      
      // Verify the student ID was removed from the class
      expect(mockClass.students).not.toContain('student123');
      expect(mockClass.students).toEqual(['student456']);
      expect(mockClass.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "Successfully unenrolled from the class." });
    });

    it('should return 404 if class is not found', async () => {
      // Mock class not found
      Class.findOne.mockResolvedValue(null);
      
      await unenrollFromClass(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "Class not found." });
    });

    it('should return 400 if student is not enrolled', async () => {
      // Mock class with student not enrolled
      const mockClass = {
        classid: 'TEST123',
        students: ['student456']
      };
      
      Class.findOne.mockResolvedValue(mockClass);
      
      await unenrollFromClass(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: "You are not enrolled in this class." });
    });

    it('should handle errors properly', async () => {
      // Mock an error during database operation
      Class.findOne.mockRejectedValue(new Error('Database error'));
      
      await unenrollFromClass(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Error unenrolling from class.",
          error: "Database error"
        })
      );
    });
  });
});