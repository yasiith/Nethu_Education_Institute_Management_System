const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
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
    }

},{
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('announcement', announcementSchema);