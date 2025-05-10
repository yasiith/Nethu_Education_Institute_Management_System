//backend\tests\classModel.test.js
process.env.MONGOMS_DISABLE_RESOLVE_CONFIG = 'true';


const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Class = require('../models/Class');

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
    await Class.deleteMany();
});

test('should create a class with default monthly fees', async () => {
    const newClass = await Class.create({
        grade: '10',
        subject: 'Math',
        date: new Date(),
        classid: 'CLS123',
        year: 2025,
        description: 'Grade 10 math class',
        privacy: 'Public',
        teacher: 'teacher1',
        students: ['student1']
    });

    expect(newClass.monthlyFees.get('January')).toBe(0);
    expect(newClass.monthlyFees.get('December')).toBe(0);
    expect(newClass.createdAt).toBeDefined();
});

test('should not create a class without a required field', async () => {
    expect.assertions(1);
    try {
        await Class.create({
            subject: 'Science',
            date: new Date(),
            classid: 'CLS124',
            year: 2025,
            description: 'Missing grade',
            privacy: 'Private',
            teacher: 'teacher2',
            students: ['student2']
        });
    } catch (e) {
        expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
    }
});
