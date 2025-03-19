const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Class = require('../models/Class');
const User = require('../models/User');
const Payment = require('../models/Payment');

// Create a Stripe checkout session
exports.createCheckoutSession = async (req, res) => {
  const { studentId, classId, month, year, amount } = req.body;

  if (!studentId || !classId || !month || !year || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const classDoc = await Class.findOne({ classid: classId });
    if (!classDoc) {
      return res.status(404).json({ error: "Class not found" });
    }

    const studentDoc = await User.findOne({ StudentID: studentId });
    if (!studentDoc) {
      return res.status(404).json({ error: "Student not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'lkr',
            product_data: {
              name: `${month} ${year} Fee`,
            },
            unit_amount: amount * 100,
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
};

// Check payment status
exports.checkPaymentStatus = async (req, res) => {
  const { studentId, classId, month, year } = req.query;

  if (!studentId || !classId || !month || !year) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const classDoc = await Class.findOne({ classid: classId });
    if (!classDoc) {
      return res.status(404).json({ error: "Class not found" });
    }

    const classIdString = classDoc.classid;

    const payment = await Payment.findOne({
      "student.StudentID": studentId,
      class: classIdString,
      month,
      year,
    });

    if (!payment) {
      return res.json({ status: "Not paid" });
    }

    res.json({ status: payment.status });
  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).json({ error: "Failed to check payment status" });
  }
};

// Create payment record
exports.createPayment = async (req, res) => {
  const { studentId, classId, month, year, amount, transactionId } = req.body;

  if (!studentId || !classId || !month || !year || !amount) {
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
    res.status(201).json({ message: 'Payment recorded successfully', payment: newPayment });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Retrieve payment details
exports.getPaymentDetails = async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    const paymentDetails = {
      studentId: session.metadata?.studentId || 'N/A',
      classId: session.metadata?.classId || 'N/A',
      month: session.metadata?.month || 'N/A',
      year: session.metadata?.year || 'N/A',
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      createdAt: new Date(paymentIntent.created * 1000).toLocaleString(),
      transactionId: paymentIntent.id,
      paymentMethod: paymentIntent.payment_method_types[0],
    };

    res.json(paymentDetails);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ error: 'Failed to retrieve payment details' });
  }
};
