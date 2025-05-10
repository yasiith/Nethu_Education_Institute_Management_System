const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../server'); // Import your Express app

let mongoServer;

// Setup function - starts the in-memory MongoDB server
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(uri);
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Clear all collections before each test
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

module.exports = { request, app };
