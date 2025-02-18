const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student: {
        StudentID: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
    },
    class: {
        type: String,
        required: true
    },
    month: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true // Not all transactions may have an ID immediately
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
