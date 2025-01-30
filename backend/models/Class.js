const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,  
    },
    classid: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    privacy: {
        type: String,
        enum: ['Public', 'Private'],
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    monthlyFees: {
        type: Map,
        of: {
            type: Number,
            default: 0,
            min: 0
        },
        required: true,
        default: {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        }
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
