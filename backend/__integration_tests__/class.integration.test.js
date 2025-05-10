const { request, app } = require('./setup');
const User = require('../models/User');
const Class = require('../models/Class');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Class Management Integration Tests', () => {
  let teacherToken;
  let teacherId = 'T12345';
  
  // Setup - create a teacher account before each test
  beforeEach(async () => {
    // Create a teacher user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(teacherId, salt);
    
    const teacher = new User({
      name: 'Test Teacher',
      email: 'teacher@example.com',
      password: hashedPassword,
      role: 'teacher',
      TeacherID: teacherId
    });
    
    await teacher.save();
    
    // Generate token for teacher
    const payload = {
      user: {
        id: teacher.id,
        role: 'teacher',
        TeacherID: teacherId
      }
    };
    
    teacherToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'jwtSecret',
      { expiresIn: '1h' }
    );
  });
  
  describe('Class Creation and Retrieval', () => {
    test('should create a new class and retrieve it', async () => {
      // Class data
      const classData = {
        teacherID: teacherId,
        grade: '10',
        subject: 'Mathematics',
        date: '2023-07-15T10:00:00Z',
        description: 'Advanced Mathematics Class',
        privacy: 'public',
        defaultMonthlyFee: 2000,
        year: 2023
      };
      
      // Create class
      const createRes = await request(app)
        .post('/api/classes')
        .set('x-auth-token', teacherToken)
        .send(classData)
        .expect(200);
        
      expect(createRes.body).toHaveProperty('status', 'ok');
      expect(createRes.body).toHaveProperty('msg', 'Class created successfully');
      expect(createRes.body).toHaveProperty('classid');
      
      const classId = createRes.body.classid;
      
      // Get classes by teacher
      const getClassesRes = await request(app)
        .get(`/api/classes/getClassesByTeacher?teacherId=${teacherId}`)
        .set('x-auth-token', teacherToken)
        .expect(200);
        
      expect(Array.isArray(getClassesRes.body)).toBe(true);
      expect(getClassesRes.body.length).toBe(1);
      expect(getClassesRes.body[0].classid).toBe(classId);
      expect(getClassesRes.body[0].subject).toBe(classData.subject);
      expect(getClassesRes.body[0].grade).toBe(classData.grade);
    });
    
    test('should get class details by ID', async () => {
      // First create a class
      const classData = {
        teacherID: teacherId,
        grade: '11',
        subject: 'Physics',
        date: '2023-07-15T10:00:00Z',
        description: 'Physics Class',
        privacy: 'public',
        defaultMonthlyFee: 2500,
        year: 2023
      };
      
      const createRes = await request(app)
        .post('/api/classes')
        .set('x-auth-token', teacherToken)
        .send(classData)
        .expect(200);
        
      const classId = createRes.body.classid;
      
      // Get class details
      const getClassRes = await request(app)
        .get(`/api/classes/${classId}`)
        .set('x-auth-token', teacherToken)
        .expect(200);
        
      expect(getClassRes.body).toHaveProperty('classid', classId);
      expect(getClassRes.body).toHaveProperty('subject', classData.subject);
      expect(getClassRes.body).toHaveProperty('grade', classData.grade);
      expect(getClassRes.body).toHaveProperty('description', classData.description);
    });
    
    test('should filter classes by grade and subject', async () => {
      // Create multiple classes
      const classData1 = {
        teacherID: teacherId,
        grade: '10',
        subject: 'Mathematics',
        date: '2023-07-15T10:00:00Z',
        description: 'Math Class',
        privacy: 'public',
        defaultMonthlyFee: 2000,
        year: 2023
      };
      
      const classData2 = {
        teacherID: teacherId,
        grade: '10',
        subject: 'Physics',
        date: '2023-07-15T10:00:00Z',
        description: 'Physics Class',
        privacy: 'public',
        defaultMonthlyFee: 2500,
        year: 2023
      };
      
      await request(app)
        .post('/api/classes')
        .set('x-auth-token', teacherToken)
        .send(classData1);
        
      await request(app)
        .post('/api/classes')
        .set('x-auth-token', teacherToken)
        .send(classData2);
        
      // Filter by grade
      const gradeFilterRes = await request(app)
        .get('/api/classes/filter?grade=10')
        .set('x-auth-token', teacherToken)
        .expect(200);
        
      expect(gradeFilterRes.body.success).toBe(true);
      expect(gradeFilterRes.body.data.length).toBe(2);
      
      // Filter by subject
      const subjectFilterRes = await request(app)
        .get('/api/classes/filter?subject=Mathematics')
        .set('x-auth-token', teacherToken)
        .expect(200);
        
      expect(subjectFilterRes.body.success).toBe(true);
      expect(subjectFilterRes.body.data.length).toBe(1);
      expect(subjectFilterRes.body.data[0].subject).toBe('Mathematics');
    });
  });
  
  describe('Class Deletion', () => {
    test('should delete a class', async () => {
      // First create a class
      const classData = {
        teacherID: teacherId,
        grade: '12',
        subject: 'Chemistry',
        date: '2023-07-15T10:00:00Z',
        description: 'Chemistry Class',
        privacy: 'public',
        defaultMonthlyFee: 2200,
        year: 2023
      };
      
      const createRes = await request(app)
        .post('/api/classes')
        .set('x-auth-token', teacherToken)
        .send(classData)
        .expect(200);
        
      const classId = createRes.body.classid;
      
      // Verify class exists
      let classesRes = await request(app)
        .get(`/api/classes/getClassesByTeacher?teacherId=${teacherId}`)
        .set('x-auth-token', teacherToken);
        
      expect(classesRes.body.length).toBe(1);
      
      // Delete the class
      await request(app)
        .delete(`/api/classes/${classId}`)
        .set('x-auth-token', teacherToken)
        .expect(200);
        
      // Verify class no longer exists
      classesRes = await request(app)
        .get(`/api/classes/getClassesByTeacher?teacherId=${teacherId}`)
        .set('x-auth-token', teacherToken);
        
      expect(classesRes.body.length).toBe(0);
    });
    
    test('should not allow unauthorized deletion', async () => {
      // Create a different teacher
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('T54321', salt);
      
      const otherTeacher = new User({
        name: 'Other Teacher',
        email: 'other@example.com',
        password: hashedPassword,
        role: 'teacher',
        TeacherID: 'T54321'
      });
      
      await otherTeacher.save();
      
      // Generate token for other teacher
      const otherPayload = {
        user: {
          id: otherTeacher.id,
          role: 'teacher',
          TeacherID: 'T54321'
        }
      };
      
      const otherToken = jwt.sign(
        otherPayload,
        process.env.JWT_SECRET || 'jwtSecret',
        { expiresIn: '1h' }
      );
      
      // First create a class with original teacher
      const classData = {
        teacherID: teacherId,
        grade: '12',
        subject: 'Biology',
        date: '2023-07-15T10:00:00Z',
        description: 'Biology Class',
        privacy: 'public',
        defaultMonthlyFee: 2300,
        year: 2023
      };
      
      const createRes = await request(app)
        .post('/api/classes')
        .set('x-auth-token', teacherToken)
        .send(classData)
        .expect(200);
        
      const classId = createRes.body.classid;
      
      // Try to delete with different teacher
      const deleteRes = await request(app)
        .delete(`/api/classes/${classId}`)
        .set('x-auth-token', otherToken)
        .expect(403);
        
      expect(deleteRes.body).toHaveProperty('message', 'Not authorized to delete this class.');
    });
  });
});
