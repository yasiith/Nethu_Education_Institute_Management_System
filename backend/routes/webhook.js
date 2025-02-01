const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment'); // Adjust the path as needed

const router = express.Router();


router.post('/api/stripe-webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
    // Log the raw body for debugging
    const rawBody = req.body.toString('utf8'); // Convert Buffer to string
  
    let event;
  
    try {
      // Verify the webhook signature using the raw request body
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`); // Log the error message
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
  
        // Extract metadata from the session
        const { studentId, classId, month, year, amount } = session.metadata;
  
        try {
          // Check if a payment record already exists for this student, class, month, and year
          const existingPayment = await Payment.findOne({
            'student.StudentID': studentId,
            class: classId,
            month,
            year,
          });
  
          // Determine the payment status based on the session's payment status
          const paymentStatus = session.payment_status === 'paid' ? 'Completed' : 'Failed';
  
          if (existingPayment) {
            // Update the existing payment record
            existingPayment.status = paymentStatus;
            existingPayment.amount = parseInt(amount);
            existingPayment.transactionId = session.id;
  
            await existingPayment.save();
          } else {
            // Create a new payment record
            const payment = new Payment({
              student: {
                StudentID: studentId,
                name: session.customer_details.name,
              },
              class: classId,
              month,
              year,
              amount: parseInt(amount),
              status: paymentStatus,
              transactionId: session.id,
            });
  
            await payment.save();
          }
  
          // Query the database to confirm the payment was saved/updated
          const savedPayment = await Payment.findOne({ transactionId: session.id });
        } catch (error) {
          console.error('Error processing payment:', error); // Log the error
          return res.status(500).json({ error: 'Failed to process payment' });
        }
        break;
    }
    res.json({ received: true });
  });




module.exports = router;