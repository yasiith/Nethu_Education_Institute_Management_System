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

router.post('/api/payments/create', async (req, res) => {
  const { studentId, classId, month, year, amount, transactionId } = req.body;
  console.log(`Received payment creation request for student ${studentId} in class ${classId} for ${month} ${year}`);

  if (!studentId || !classId || !month || !year || !amount) {
      console.error('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
      const existingPayment = await Payment.findOne({ 
          'student.StudentID': studentId, 
          class: classId, 
          month, 
          year 
      });

      if (existingPayment) {
          console.error('Payment for this month already exists');
          return res.status(400).json({ message: 'Payment for this month already exists' });
      }

      const newPayment = new Payment({
          student: {
              StudentID: studentId,
          },
          class: classId,
          month,
          year,
          amount,
          status: 'Completed',
          transactionId: transactionId || null,
      });

      await newPayment.save();
      console.log('Payment recorded successfully:', newPayment);
      res.status(201).json({ message: 'Payment recorded successfully', payment: newPayment });

  } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/api/payment-details/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  console.log("sessionId", sessionId);

  try {
      // Retrieve the Checkout Session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("session", session);

      if (!session) {
          return res.status(404).json({ error: 'Session not found' });
      }

      // Retrieve the Payment Intent (for full payment details)
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

      // Construct the response
      const paymentDetails = {
          studentId: session.metadata?.studentId || 'N/A',
          classId: session.metadata?.classId || 'N/A',
          month: session.metadata?.month || 'N/A',
          year: session.metadata?.year || 'N/A',
          amount: paymentIntent.amount / 100, // Convert cents to dollars
          currency: paymentIntent.currency,
          status: paymentIntent.status, // 'succeeded', 'requires_payment_method', etc.
          createdAt: new Date(paymentIntent.created * 1000).toLocaleString(),
          transactionId: paymentIntent.id, // Stripe Payment Intent ID
          paymentMethod: paymentIntent.payment_method_types[0], // e.g., 'card'
      };

      res.json(paymentDetails);
  } catch (error) {
      console.error('Error fetching payment details:', error);
      res.status(500).json({ error: 'Failed to retrieve payment details' });
  }
});



module.exports = router;
