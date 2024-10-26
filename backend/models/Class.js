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
    description: {
        type: String,
        required: true,
    },
    privacy: {
        type: String,
        enum: ['public', 'private'],
        required: true,
    },
},{
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Class', classSchema);