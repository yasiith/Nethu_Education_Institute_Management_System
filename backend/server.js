require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminDashBoardRoutes = require('./routes/adminDashBoardRoutes');
const quizRoutes = require('./routes/quiz');
const webhookroutes = require('./routes/webhook');
const chatbotRoutes = require('./routes/chatbot');
const materialRoutes = require('./routes/material');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());

// Webhook route must use bodyParser.raw() to preserve the raw body
app.post('/api/stripe-webhook', bodyParser.raw({ type: 'application/json' }), webhookroutes);

// Use express.json() for parsing JSON bodies (for all routes except the webhook)
app.use(express.json());

// Define Routes
app.use('/api/quizzes', quizRoutes);
app.use(authRoutes);
app.use(teacherRoutes);
app.use(classRoutes);
app.use(studentRoutes);
app.use(adminDashBoardRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.use("/api/materials", materialRoutes);



// Set up a basic route for testing
app.get('/', (req, res) => res.send('API Running'));

// Define the Port
const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));