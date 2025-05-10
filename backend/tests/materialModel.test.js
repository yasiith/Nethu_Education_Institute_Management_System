const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Material = require('../models/material'); // Adjust path if different

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Material.deleteMany();
});

describe('Material Model Test', () => {
    it('should create and save a material successfully', async () => {
        const materialData = {
            title: 'Physics Notes',
            description: 'Chapter 1 to 3 summary',
            fileUrl: 'http://example.com/physics-notes.pdf',
            month: 'March',
            privacy: 'Public',
            classid: 'CLS001'
        };

        const validMaterial = new Material(materialData);
        const savedMaterial = await validMaterial.save();

        expect(savedMaterial._id).toBeDefined();
        expect(savedMaterial.title).toBe(materialData.title);
        expect(savedMaterial.privacy).toBe('Public');
    });

    it('should fail to create a material without required field', async () => {
        const invalidMaterialData = {
            title: 'Chemistry Notes',
            // description missing
            fileUrl: 'http://example.com/chem-notes.pdf',
            month: 'April',
            privacy: 'Private',
            classid: 'CLS002'
        };

        try {
            const invalidMaterial = new Material(invalidMaterialData);
            await invalidMaterial.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.description).toBeDefined();
        }
    });
});
