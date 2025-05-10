const { 
    createAnnouncement, 
    getAllAnnouncements, 
    updateAnnouncement, 
    deleteAnnouncement 
  } = require('../controllers/announcementController');
  const Announcement = require('../models/Announcement');
  
  // Mock the Announcement model
  jest.mock('../models/Announcement');
  
  describe('Announcement Controller', () => {
    let req, res;
    const mockAnnouncement = {
      _id: 'mock-id-123',
      grade: '10',
      subject: 'Mathematics',
      date: '2025-05-15',
      description: 'Test announcement'
    };
  
    beforeEach(() => {
      // Reset and recreate mocks before each test
      req = {
        body: {},
        params: {}
      };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
      };
      console.error = jest.fn(); // Mock console.error
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createAnnouncement', () => {
      test('should create an announcement with valid data', async () => {
        // Setup
        req.body = {
          grade: '10',
          subject: 'Mathematics',
          date: '2025-05-15',
          description: 'Test announcement'
        };
  
        // Mock Announcement constructor and save method
        const saveMock = jest.fn().mockResolvedValueOnce();
        Announcement.mockImplementation(() => ({
          ...req.body,
          save: saveMock
        }));
  
        // Execute
        await createAnnouncement(req, res);
  
        // Assert
        expect(Announcement).toHaveBeenCalledWith(req.body);
        expect(saveMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'Announcement created successfully.',
            status: 'ok'
          })
        );
      });
  
      test('should return 400 when required fields are missing', async () => {
        // Missing fields in the request body
        req.body = {
          grade: '10',
          // Missing subject, date, description
        };
  
        // Execute
        await createAnnouncement(req, res);
  
        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          message: 'All fields are required.'
        });
      });
  
      test('should handle errors during creation', async () => {
        // Setup
        req.body = {
          grade: '10',
          subject: 'Mathematics',
          date: '2025-05-15',
          description: 'Test announcement'
        };
  
        const errorMessage = 'Database connection error';
        const saveMock = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
        Announcement.mockImplementation(() => ({
          ...req.body,
          save: saveMock
        }));
  
        // Execute
        await createAnnouncement(req, res);
  
        // Assert
        expect(saveMock).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'Error creating announcement.',
            error: errorMessage
          })
        );
      });
    });
  
    describe('getAllAnnouncements', () => {
      test('should return all announcements', async () => {
        // Setup
        const mockAnnouncements = [mockAnnouncement, {...mockAnnouncement, _id: 'mock-id-456'}];
        Announcement.find.mockResolvedValueOnce(mockAnnouncements);
  
        // Execute
        await getAllAnnouncements(req, res);
  
        // Assert
        expect(Announcement.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Announcements fetched successfully.',
          announcements: mockAnnouncements
        });
      });
  
      test('should handle errors when fetching announcements', async () => {
        // Setup
        const errorMessage = 'Database query failed';
        Announcement.find.mockRejectedValueOnce(new Error(errorMessage));
  
        // Execute
        await getAllAnnouncements(req, res);
  
        // Assert
        expect(console.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Error fetching announcements.',
          error: errorMessage
        });
      });
    });
  
    describe('updateAnnouncement', () => {
      test('should update an announcement with valid data', async () => {
        // Setup
        req.params = { id: 'mock-id-123' };
        req.body = {
          grade: '11',
          subject: 'Physics',
          date: '2025-05-20',
          description: 'Updated announcement'
        };
  
        Announcement.findByIdAndUpdate.mockResolvedValueOnce({
          _id: req.params.id,
          ...req.body
        });
  
        // Execute
        await updateAnnouncement(req, res);
  
        // Assert
        expect(Announcement.findByIdAndUpdate).toHaveBeenCalledWith(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'Announcement updated successfully.',
            status: 'ok'
          })
        );
      });
  
      test('should return 404 when announcement not found', async () => {
        // Setup
        req.params = { id: 'non-existent-id' };
        req.body = {
          grade: '11',
          subject: 'Physics',
          date: '2025-05-20',
          description: 'Updated announcement'
        };
  
        Announcement.findByIdAndUpdate.mockResolvedValueOnce(null);
  
        // Execute
        await updateAnnouncement(req, res);
  
        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
          message: 'Announcement not found.'
        });
      });
  
      test('should handle errors during update', async () => {
        // Setup
        req.params = { id: 'mock-id-123' };
        req.body = {
          grade: '11',
          subject: 'Physics',
          date: '2025-05-20',
          description: 'Updated announcement'
        };
  
        const errorMessage = 'Update failed';
        Announcement.findByIdAndUpdate.mockRejectedValueOnce(new Error(errorMessage));
  
        // Execute
        await updateAnnouncement(req, res);
  
        // Assert
        expect(console.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
          message: 'Error updating announcement.',
          error: errorMessage
        });
      });
    });
  
    describe('deleteAnnouncement', () => {
      test('should delete an existing announcement', async () => {
        // Setup
        req.params = { id: 'mock-id-123' };
        Announcement.findByIdAndDelete.mockResolvedValueOnce(mockAnnouncement);
  
        // Execute
        await deleteAnnouncement(req, res);
  
        // Assert
        expect(Announcement.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
          message: 'Announcement deleted successfully.',
          status: 'ok'
        });
      });
  
      test('should return 404 when announcement to delete is not found', async () => {
        // Setup
        req.params = { id: 'non-existent-id' };
        Announcement.findByIdAndDelete.mockResolvedValueOnce(null);
  
        // Execute
        await deleteAnnouncement(req, res);
  
        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
          message: 'Announcement not found.'
        });
      });
  
      test('should handle errors during deletion', async () => {
        // Setup
        req.params = { id: 'mock-id-123' };
        const errorMessage = 'Deletion failed';
        Announcement.findByIdAndDelete.mockRejectedValueOnce(new Error(errorMessage));
  
        // Execute
        await deleteAnnouncement(req, res);
  
        // Assert
        expect(console.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
          message: 'Error deleting announcement.',
          error: errorMessage
        });
      });
    });
  });