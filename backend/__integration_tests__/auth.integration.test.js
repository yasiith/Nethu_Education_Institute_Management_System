const { request, app } = require('./setup');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

describe('Authentication Integration Tests', () => {
  // Test admin registration and login
  describe('Admin Authentication', () => {
    test('should register a new admin and login successfully', async () => {
      // Register admin
      const adminData = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'adminPassword123'
      };
      
      const registerRes = await request(app)
        .post('/api/auth/register-admin')
        .send(adminData)
        .expect(200);
        
      expect(registerRes.body).toHaveProperty('msg', 'Admin created successfully');
      
      // Login with the new admin
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: adminData.email,
          password: adminData.password
        })
        .expect(200);
        
      expect(loginRes.body).toHaveProperty('status', 'ok');
      expect(loginRes.body).toHaveProperty('data'); // JWT token
      expect(loginRes.body).toHaveProperty('type', 'admin');
    });
  });
  
  // Test teacher creation and login
  describe('Teacher Authentication', () => {
    let adminToken;
    
    // Setup - create admin first to use for teacher creation
    beforeEach(async () => {
      // Create an admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('adminPassword123', salt);
      
      const admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await admin.save();
      
      // Login as admin to get token
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'adminPassword123'
        });
        
      adminToken = loginRes.body.data;
    });
    
    test('should create a teacher and login successfully', async () => {
      const teacherData = {
        name: 'Test Teacher',
        email: 'teacher@example.com',
        TeacherID: 'T12345'
      };
      
      // Create teacher (requires admin token)
      const createRes = await request(app)
        .post('/api/auth/create-teacher')
        .set('x-auth-token', adminToken)
        .send(teacherData)
        .expect(200);
        
      expect(createRes.body).toHaveProperty('status', 'ok');
      expect(createRes.body).toHaveProperty('msg', 'Teacher created successfully');
      
      // Login with the new teacher (password is the TeacherID by default)
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: teacherData.email,
          password: teacherData.TeacherID
        })
        .expect(200);
        
      expect(loginRes.body).toHaveProperty('status', 'ok');
      expect(loginRes.body).toHaveProperty('data'); // JWT token
      expect(loginRes.body).toHaveProperty('type', 'teacher');
      expect(loginRes.body).toHaveProperty('TeacherID', teacherData.TeacherID);
    });
  });
  
  // Test student creation and login
  describe('Student Authentication', () => {
    let adminToken;
    
    // Setup - create admin first to use for student creation
    beforeEach(async () => {
      // Create an admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('adminPassword123', salt);
      
      const admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await admin.save();
      
      // Login as admin to get token
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'adminPassword123'
        });
        
      adminToken = loginRes.body.data;
    });
    
    test('should create a student and login successfully', async () => {
      const studentData = {
        name: 'Test Student',
        email: 'student@example.com',
        StudentID: 'S12345'
      };
      
      // Create student (requires admin token)
      const createRes = await request(app)
        .post('/api/auth/create-student')
        .set('x-auth-token', adminToken)
        .send(studentData)
        .expect(200);
        
      expect(createRes.body).toHaveProperty('status', 'ok');
      expect(createRes.body).toHaveProperty('msg', 'Student created successfully');
      
      // Login with the new student (password is the StudentID by default)
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: studentData.email,
          password: studentData.StudentID
        })
        .expect(200);
        
      expect(loginRes.body).toHaveProperty('status', 'ok');
      expect(loginRes.body).toHaveProperty('data'); // JWT token
      expect(loginRes.body).toHaveProperty('type', 'student');
      expect(loginRes.body).toHaveProperty('StudentID', studentData.StudentID);
      expect(loginRes.body).toHaveProperty('name', studentData.name);
    });
  });
  
  // Test invalid login attempts
  describe('Invalid Authentication Attempts', () => {
    test('should reject login with non-existent user', async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(400);
        
      expect(loginRes.body).toHaveProperty('msg', 'Invalid Credentials');
    });
    
    test('should reject login with incorrect password', async () => {
      // Create a user first
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('correctPassword', salt);
      
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'teacher',
        TeacherID: 'T12345'
      });
      
      await user.save();
      
      // Try to login with wrong password
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongPassword'
        })
        .expect(400);
        
      expect(loginRes.body).toHaveProperty('msg', 'Invalid Credentials');
    });
  });
});
