const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Payment = require('../models/Payment'); // Adjust path if different

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
    await Payment.deleteMany();
});

describe('Payment Model Test', () => {

    it('should create and save a payment successfully', async () => {
        const validPayment = new Payment({
            student: {
                StudentID: 'S001',
                name: 'John Doe'
            },
            class: 'CLS001',
            month: 'January',
            year: 2025,
            amount: 1500,
            status: 'Completed',
            transactionId: 'TX12345'
        });

        const savedPayment = await validPayment.save();

        expect(savedPayment._id).toBeDefined();
        expect(savedPayment.student.StudentID).toBe('S001');
        expect(savedPayment.status).toBe('Completed');
        expect(savedPayment.createdAt).toBeDefined();
    });

    it('should fail when required fields are missing', async () => {
        const invalidPayment = new Payment({
            student: {
                StudentID: 'S002'
            },
            // Missing class, month, year, amount
        });

        try {
            await invalidPayment.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.class).toBeDefined();
            expect(error.errors.month).toBeDefined();
            expect(error.errors.year).toBeDefined();
            expect(error.errors.amount).toBeDefined();
        }
    });

    it('should fail with invalid month value', async () => {
        const paymentWithInvalidMonth = new Payment({
            student: { StudentID: 'S003', name: 'Invalid Month' },
            class: 'CLS002',
            month: 'NotAMonth',
            year: 2025,
            amount: 1000
        });

        try {
            await paymentWithInvalidMonth.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.month).toBeDefined();
        }
    });

    it('should use default status "Pending" if not provided', async () => {
        const paymentWithoutStatus = new Payment({
            student: { StudentID: 'S004', name: 'No Status' },
            class: 'CLS003',
            month: 'May',
            year: 2025,
            amount: 1800
        });

        const saved = await paymentWithoutStatus.save();
        expect(saved.status).toBe('Pending');
    });
});
