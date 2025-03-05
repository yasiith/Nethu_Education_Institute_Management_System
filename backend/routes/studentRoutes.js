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




const router = express.Router();

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




module.exports = router;
