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

const zoomMeetingController = require('../controllers/zoomMeetingController');
const ZoomMeeting = require('../models/ZoomMeeting');

require('dotenv').config();

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


// Create Zoom Meeting (Teacher Only)
router.post('/api/zoom/meetings', auth, zoomMeetingController.createZoomMeeting);

// Get Zoom Meeting Details (Student Only)
router.get('/api/zoom/meetings', auth, zoomMeetingController.getZoomMeetingDetails);



// Fetch meetings by classId and month
router.get('/api/meetings', async (req, res) => {
  try {
      const { classId, month } = req.query;
      
      if (!classId || !month) {
          return res.status(400).json({ message: 'classId and month are required' });
      }
      
      const meetings = await ZoomMeeting.find({ classId, month });
      res.status(200).json(meetings);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to fetch meetings by teacherId and classId
router.get('/api/meetings/teacher', async (req, res) => {
  try {
    const { teacherId, classId } = req.query;

    if (!teacherId || !classId) {
      return res.status(400).json({ message: 'teacherId and classId are' });
    }

    // Find meetings by teacherId and classId
    const meetings = await ZoomMeeting.find({ teacherId, classId });

    if (!meetings || meetings.length === 0) {
      return res.status(404).json({ message: 'No meetings found for the given teacherId and classId' });
    }

    return res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});


// DELETE a meeting by ID
router.delete('/api/meeting/:id', async (req, res) => {
  try {
      const meeting = await ZoomMeeting.findByIdAndDelete(req.params.id);
      
      if (!meeting) {
          return res.status(404).json({ message: 'Meeting not found' });
      }
      
      res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting meeting', error: error.message });
  }
});



// Fetch Monthly Fees by classid
router.get('/api/monthly-fees/:classid', async (req, res) => {
  try {
      const classData = await Class.findOne({ classid: req.params.classid });

      if (!classData) {
          return res.status(404).json({ message: 'Class not found' });
      }

      res.json({ monthlyFees: classData.monthlyFees });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});


// Update Monthly Fees by classid
router.put('/api/monthly-fees/:classid', async (req, res) => {
  try {
      const { month, amount } = req.body;

      if (!month || amount === undefined) {
          return res.status(400).json({ message: 'Month and amount are required' });
      }

      const classData = await Class.findOne({ classid: req.params.classid });

      if (!classData) {
          return res.status(404).json({ message: 'Class not found' });
      }

      classData.monthlyFees.set(month, amount);
      await classData.save();

      res.json({ message: 'Monthly fee updated successfully', monthlyFees: classData.monthlyFees });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
