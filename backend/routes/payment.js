const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create Stripe checkout session
router.post('/create-checkout-session', paymentController.createCheckoutSession);

// Check payment status
router.get('/status', paymentController.checkPaymentStatus);

// Create payment record (for manual payments / marking as paid)
router.post('/create', paymentController.createPayment);

// Delete payment record (for marking as unpaid)
router.delete('/:id', paymentController.deletePayment);

// Get payments by class and student
router.get('/:classId/:studentId', paymentController.getPaymentsByClassAndStudent);

// Get payment details by session ID
router.get('/payment-details/:sessionId', paymentController.getPaymentDetails);

module.exports = router;