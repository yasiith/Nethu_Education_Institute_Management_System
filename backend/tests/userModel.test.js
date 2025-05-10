const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User'); // adjust path as needed

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany();
});

describe('User Model Test', () => {
    it('should create a valid student user', async () => {
        const validUser = new User({
            name: 'John Doe',
            email: 'john@student.com',
            password: 'securepassword',
            StudentID: 'S1234',
            role: 'student'
        });

        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.role).toBe('student');
        expect(savedUser.StudentID).toBe('S1234');
    });

    it('should fail without required fields', async () => {
        const user = new User({});

        try {
            await user.save();
            throw new Error('User saved without required fields');
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.name).toBeDefined();
            expect(error.errors.email).toBeDefined();
            expect(error.errors.password).toBeDefined();
        }
    });

    it('should fail with invalid email format', async () => {
        const user = new User({
            name: 'Invalid Email',
            email: 'not-an-email',
            password: 'pass1234'
        });

        try {
            await user.save();
            throw new Error('User saved with invalid email');
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.email).toBeDefined();
        }
    });

    it('should enforce unique email constraint', async () => {
        const user1 = new User({
            name: 'User One',
            email: 'duplicate@example.com',
            password: 'pass1234'
        });

        const user2 = new User({
            name: 'User Two',
            email: 'duplicate@example.com',
            password: 'pass5678'
        });

        await user1.save();
        try {
            await user2.save();
            throw new Error('Duplicate email allowed');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.code).toBe(11000); // MongoDB duplicate key error
        }
    });

    it('should allow teacher with unique TeacherID and no StudentID', async () => {
        const teacher = new User({
            name: 'Teacher Joe',
            email: 'teacher@example.com',
            password: 'teach123',
            TeacherID: 'T9876',
            role: 'teacher'
        });

        const savedTeacher = await teacher.save();
        expect(savedTeacher.TeacherID).toBe('T9876');
        expect(savedTeacher.StudentID).toBeUndefined();
    });
});
