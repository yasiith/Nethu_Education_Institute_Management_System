const express = require('express');
const { enrollInClass, checkEnrollmentStatus, unenrollFromClass } = require('../controllers/studentController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const Payment = require("../models/Payment");
const Class = require('../models/Class');
const User = require('../models/User');
const paymentController = require('../controllers/paymentController');
const Meeting = require('../models/Meeting');
const StudentAccess = require('../models/StudentAccess');




require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');





const router = express.Router();

router.use(bodyParser.json());

// Enroll in a class
router.post("/api/student/enroll/:classId", auth, checkRole('student'), enrollInClass);

// Check enrollment status
router.get("/api/student/enrollment-status/:classId", auth, checkRole('student'), checkEnrollmentStatus);

// Unenroll from a class
router.delete("/api/student/unenroll/:classId", auth, checkRole('student'), unenrollFromClass);

// get student info by StudentID
router.get('/api/student/getstudentinfo/:StudentID', async (req, res) => {
  const { StudentID } = req.params;
  try {
      const student =
          await User.findOne({ StudentID });
      if (!student) { return res.status(404).json({ message: 'Student not found' }); }
      res.json(student);  // return the student info
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
}
);

// Route to create checkout session
router.post('/api/create-checkout-session', paymentController.createCheckoutSession);

// Route to check payment status
router.get('/api/check-payment-status', paymentController.checkPaymentStatus);

// Route to create payment record
router.post('/api/payments/create', paymentController.createPayment);

// Route to get payment details
router.get('/api/payment-details/:sessionId', paymentController.getPaymentDetails);


// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};



// Function to get Zoom OAuth access token
async function getZoomAccessToken() {
  try {
    const response = await axios.post(
      `https://zoom.us/oauth/token`,
      null,
      {
        params: {
          grant_type: 'account_credentials',
          account_id: process.env.ZOOM_ACCOUNT_ID,
        },
        auth: {
          username: process.env.ZOOM_CLIENT_ID,
          password: process.env.ZOOM_CLIENT_SECRET,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Zoom access token:', error);
    throw error;
  }
}


// Route to create Zoom meeting
router.post('/api/zoom/create-meeting',authenticate , async (req, res) => {
  
  const { topic, start_time, duration, timezone, password } = req.body;

  try {
    // Get Zoom access token
    const zoomToken = await getZoomAccessToken();

    // Create Zoom meeting
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic,
        type: 2,
        start_time,
        duration,
        timezone,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${zoomToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Save meeting details to database
    const meeting = new Meeting({
      meetingId: response.data.id,
      teacherId: req.user.id,
      topic,
      startTime: start_time,
      duration,
      password,
      joinUrl: response.data.join_url,
    });
    await meeting.save();

    res.status(201).json({
      meeting_id: response.data.id,
      join_url: response.data.join_url,
      password,
    });
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    res.status(500).json({ message: 'Failed to create meeting' });
  }
});

// Endpoint: Generate Unique Join Link (Student)
router.post('/api/zoom/generate-join-link', authenticate, async (req, res) => {

  const { meeting_id } = req.body;
  const studentId = req.user.user.StudentID;
  try {

    // Fetch meeting details
    const meeting = await Meeting.findOne({ meetingId: meeting_id });
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Generate unique join URL
    const uniqueJoinUrl = `${meeting.joinUrl}?pwd=${meeting.password}&uname=${studentId}`;

    // Save student access details
    const studentAccess = new StudentAccess({
      studentId,
      meetingId: meeting_id,
      joinUrl: uniqueJoinUrl,
      accessGranted: true,
    });
    await studentAccess.save();

    res.status(200).json({ join_url: uniqueJoinUrl });
  } catch (error) {
    console.error('Error generating join link:', error);
    res.status(500).json({ message: 'Failed to generate join link' });
  }
});






module.exports = router;
