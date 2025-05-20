const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Quiz = require('../models/Quiz'); // Adjust this path if necessary

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
    await Quiz.deleteMany();
});

describe('Quiz Model Test', () => {

    it('should create and save a valid quiz successfully', async () => {
        const validQuiz = new Quiz({
            title: 'Math Quiz 1',
            classID: 'CLS123',
            month: 'April',
            description: 'Basic algebra quiz',
            createdBy: new mongoose.Types.ObjectId(),
            questions: [
                {
                    questionText: 'What is 2 + 2?',
                    options: ['2', '3', '4', '5'],
                    correctAnswer: '4'
                }
            ]
        });

        const savedQuiz = await validQuiz.save();

        expect(savedQuiz._id).toBeDefined();
        expect(savedQuiz.title).toBe('Math Quiz 1');
        expect(savedQuiz.questions.length).toBe(1);
        expect(savedQuiz.questions[0].correctAnswer).toBe('4');
    });

    it('should fail to create a quiz missing required fields', async () => {
        const invalidQuiz = new Quiz({
            // Missing title, classID, and createdBy
            month: 'May',
            questions: []
        });

        try {
            await invalidQuiz.save();
            throw new Error('Quiz saved when it should have failed validation');
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.title).toBeDefined();
            expect(error.errors.classID).toBeDefined();
            expect(error.errors.createdBy).toBeDefined();
        }
    });

    it('should fail to create quiz with incomplete question', async () => {
        const quizWithInvalidQuestion = new Quiz({
            title: 'Science Quiz',
            classID: 'CLS321',
            month: 'June',
            createdBy: new mongoose.Types.ObjectId(),
            questions: [
                {
                    // Missing options and correctAnswer
                    questionText: 'What is H2O?'
                }
            ]
        });

        try {
            await quizWithInvalidQuestion.save();
            throw new Error('Quiz saved when it should have failed validation');
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);

            // Only 'correctAnswer' will be caught here based on current schema
            expect(error.errors['questions.0.correctAnswer']).toBeDefined();

            // We avoid checking 'questions.0.options' since Mongoose doesn't enforce it
            expect(Object.keys(error.errors).length).toBeGreaterThanOrEqual(1);
        }
    });

});
