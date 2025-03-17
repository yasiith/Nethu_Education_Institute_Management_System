const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    meetingId: String,
    teacherId: String,
    topic: String,
    startTime: Date,
    duration: Number,
    password: String,
    joinUrl: String,
});

module.exports = mongoose.model('Meeting', meetingSchema);