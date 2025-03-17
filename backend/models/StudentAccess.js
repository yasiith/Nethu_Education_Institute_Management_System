const mongoose = require('mongoose');

const studentAccessSchema = new mongoose.Schema({
    studentId: String,
    meetingId: String,
    joinUrl: String,
    accessGranted: Boolean,
});

module.exports = mongoose.model('StudentAccess', studentAccessSchema);