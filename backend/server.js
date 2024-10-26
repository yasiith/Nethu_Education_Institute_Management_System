const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const classes = require('./routes/classRoutes');
const app = express();
require('dotenv').config();
const cors = require("cors");
// Connect Database
connectDB();

app.use(cors());
// Init Middleware
app.use(express.json());


// Define Routes

app.use('/api/auth', authRoutes);
app.use('/api/classRoutes', classes);

// Set up a basic route for testing
app.get('/', (req, res) => res.send('API Running'));

// Define the Port
const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



