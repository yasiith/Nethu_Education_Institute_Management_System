const { request, app } = require('./setup');
const User = require('../models/User');
const Class = require('../models/Class');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Student Enrollment Integration Tests', () => {
  let teacherToken;
  let studentToken;
  let teacherId = 'T12345';
  let studentId = 'S12345';
  let classId;
  
  // Setup - create a teacher, student, and class before tests
  beforeEach(async () => {
    // Create a teacher
    const salt = await bcrypt.genSalt(10);
    const teacherHashedPassword = await bcrypt.hash(teacherId, salt);
    
    const teacher = new User({
      name: 'Test Teacher',
      email: 'teacher@example.com',
      password: teacherHashedPassword,
      role: 'teacher',
      TeacherID: teacherId
    });
    
    await teacher.save();
    
    // Create token for teacher
    const teacherPayload = {
      user: {
        id: teacher.id,
        role: 'teacher',
        TeacherID: teacherId
      }
    };
    
    teacherToken = jwt.sign(
      teacherPayload,
      process.env.JWT_SECRET || 'jwtSecret',
      { expiresIn: '1h' }
    );
    
    // Create a student
    const studentHashedPassword = await bcrypt.hash(studentId, salt);
    
    const student = new User({
      name: 'Test Student',
      email: 'student@example.com',
      password: studentHashedPassword,
      role: 'student',
      StudentID: studentId
    });
    
    await student.save();
    
    // Create token for student
    const studentPayload = {
      user: {
        id: student.id,
        role: 'student',
        StudentID: studentId
      }
    };
    
    studentToken = jwt.sign(
      studentPayload,
      process.env.JWT_SECRET || 'jwtSecret',
      { expiresIn: '1h' }
    );
    
    // Create a class
    const classData = {
      teacherID: teacherId,
      grade: '10',
      subject: 'Mathematics',
      date: '2023-07-15T10:00:00Z',
      description: 'Math Class',
      privacy: 'public',
      defaultMonthlyFee: 2000,
      year: 2023
    };
    
    const createRes = await request(app)
      .post('/api/classes')
      .set('x-auth-token', teacherToken)
      .send(classData);
      
    classId = createRes.body.classid;
  });
  
  describe('Student Enrollment Process', () => {
    test('should allow student to enroll in a class and check enrollment', async () => {
      // Enroll in the class
      const enrollRes = await request(app)
        .post(`/api/student/enroll/${classId}`)
        .set('x-auth-token', studentToken)
        .expect(200);
        
      expect(enrollRes.body).toHaveProperty('message', 'Successfully enrolled in class.');
      
      // Check enrollment status
      const statusRes = await request(app)
        .get(`/api/student/enrollment-status/${classId}`)
        .set('x-auth-token', studentToken)
        .expect(200);
        
      expect(statusRes.body).toHaveProperty('isEnrolled', true);
      
      // Verify students list in class
      const classRes = await request(app)
        .get(`/api/classes/${classId}`)
        .set('x-auth-token', teacherToken)
        .expect(200);
        
      expect(classRes.body.students).toContain(studentId);
    });
    
    test('should not allow duplicate enrollment', async () => {
      // Enroll first time
      await request(app)
        .post(`/api/student/enroll/${classId}`)
        .set('x-auth-token', studentToken)
        .expect(200);
        
      // Try to enroll again
      const duplicateRes = await request(app)
        .post(`/api/student/enroll/${classId}`)
        .set('x-auth-token', studentToken)
        .expect(400);
        
      expect(duplicateRes.body).toHaveProperty('message', 'Already enrolled in this class.');
    });
    
    test('should allow student to unenroll from a class', async () => {
      // First enroll
      await request(app)
        .post(`/api/student/enroll/${classId}`)
        .set('x-auth-token', studentToken)
        .expect(200);
        
      // Check enrollment status - should be enrolled
      let statusRes = await request(app)
        .get(`/api/student/enrollment-status/${classId}`)
        .set('x-auth-token', studentToken);
        
      expect(statusRes.body.isEnrolled).toBe(true);
      
      // Unenroll
      const unenrollRes = await request(app)
        .delete(`/api/student/unenroll/${classId}`)
        .set('x-auth-token', studentToken)
        .expect(200);
        
      expect(unenrollRes.body).toHaveProperty('message', 'Successfully unenrolled from class.');
      
      // Check enrollment status again - should not be enrolled
      statusRes = await request(app)
        .get(`/api/student/enrollment-status/${classId}`)
        .set('x-auth-token', studentToken);
        
      expect(statusRes.body.isEnrolled).toBe(false);
    });
  });
  
  describe('Class Students Management', () => {
    test('should retrieve all students enrolled in a class', async () => {
      // Enroll the student
      await request(app)
        .post(`/api/student/enroll/${classId}`)
        .set('x-auth-token', studentToken);
        
      // Create another student
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash('S54321', salt);
      
      const anotherStudent = new User({
        name: 'Another Student',
        email: 'another@example.com',
        password: hashPassword,
        role: 'student',
        StudentID: 'S54321'
      });
      
      await anotherStudent.save();
      
      // Create token for the new student
      const anotherPayload = {
        user: {
          id: anotherStudent.id,
          role: 'student',
          StudentID: 'S54321'
        }
      };
      
      const anotherToken = jwt.sign(
        anotherPayload,
        process.env.JWT_SECRET || 'jwtSecret',
        { expiresIn: '1h' }
      );
      
      // Enroll the second student
      await request(app)
        .post(`/api/student/enroll/${classId}`)
        .set('x-auth-token', anotherToken);
        
      // Get students by class ID (teacher access)
      const studentsRes = await request(app)
        .get(`/api/auth/students/${classId}`)
        .set('x-auth-token', teacherToken)
        .expect(200);
        
      expect(studentsRes.body).toHaveProperty('students');
      expect(studentsRes.body.students.length).toBe(2);
      expect(studentsRes.body.students).toContain(studentId);
      expect(studentsRes.body.students).toContain('S54321');
    });
  });
});
