const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminDashBoardRoutes = require('./routes/adminDashBoardRoutes');
const quizRoutes = require('./routes/quiz.js');


const app = express();
require('dotenv').config();
const cors = require("cors");
// Connect Database
connectDB();

app.use(cors());
// Init Middleware
app.use(express.json());

app.use('/api/quizzes', quizRoutes);


// Define Routes

app.use(authRoutes);
app.use(teacherRoutes);
app.use(classRoutes);
app.use(studentRoutes);
app.use(adminDashBoardRoutes);

// Set up a basic route for testing
app.get('/', (req, res) => res.send('API Running'));

const chatbotRoutes = require('./routes/chatbot');

app.use('/api/chatbot', chatbotRoutes);


// Define the Port
const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



