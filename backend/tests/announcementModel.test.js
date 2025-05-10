const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Announcement = require('../models/Announcement');

// backend/models/Announcement.test.js
process.env.MONGOMS_DISABLE_RESOLVE_CONFIG = 'true';


let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Announcement.deleteMany();
});

test('should create an announcement successfully', async () => {
    const newAnnouncement = await Announcement.create({
        grade: '10',
        subject: 'Math',
        date: new Date(),
        description: 'Exam announcement for grade 10 math',
    });

    expect(newAnnouncement.grade).toBe('10');
    expect(newAnnouncement.subject).toBe('Math');
    expect(newAnnouncement.description).toBe('Exam announcement for grade 10 math');
    expect(newAnnouncement.createdAt).toBeDefined();
    expect(newAnnouncement.updatedAt).toBeDefined();
});

test('should throw validation error when required fields are missing', async () => {
    expect.assertions(1);
    try {
        await Announcement.create({
            subject: 'Science',
            date: new Date(),
        });
    } catch (e) {
        expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
    }
});