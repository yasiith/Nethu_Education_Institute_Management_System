const express = require('express');
const { enrollInClass, checkEnrollmentStatus, unenrollFromClass } = require('../controllers/studentController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const Payment = require("../models/Payment");
const Class = require('../models/Class');
const User = require('../models/User');



const router = express.Router();

// Enroll in a class
router.post("/api/student/enroll/:classId", auth, checkRole('student'), enrollInClass);

// Check enrollment status
router.get("/api/student/enrollment-status/:classId", auth, checkRole('student'), checkEnrollmentStatus);

// Unenroll from a class
router.delete("/api/student/unenroll/:classId", auth, checkRole('student'), unenrollFromClass);



router.post('/api/create-checkout-session', async (req, res) => {
  const { studentId, classId, month, year, amount } = req.body;

  if (!studentId || !classId || !month || !year || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Find the class by its custom classid
    const classDoc = await Class.findOne({ classid: classId });
    if (!classDoc) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Find the student by their custom ID
    const studentDoc = await User.findOne({ StudentID: studentId });
    if (!studentDoc) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'lkr',
            product_data: {
              name: `${month} ${year} Fee`,
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/student/month-details?classid=${classId}&year=${year}&month=${month}&payment_success=true`,
      cancel_url: `${process.env.BASE_URL}`,
      metadata: {
        studentId,
        classId,
        month,
        year,
        amount,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

// Check payment status
router.get('/api/check-payment-status', async (req, res) => {
  const { studentId, classId, month, year } = req.query;

  if (!studentId || !classId || !month || !year) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Find the class by its custom classid (e.g., "C001")
    const classDoc = await Class.findOne({ classid: classId });
    if (!classDoc) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Use the classid (String) of the found class
    const classIdString = classDoc.classid;

    // Find the payment record for the given student, class, month, and year
    const payment = await Payment.findOne({
      "student.StudentID": studentId, // Query using the custom StudentID
      class: classIdString, // Use the classid as a String
      month,
      year,
    });

    if (!payment) {
      return res.json({ status: "Not paid" });
    }

    // Return the payment status
    res.json({ status: payment.status });
  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).json({ error: "Failed to check payment status" });
  }
});


module.exports = router;
