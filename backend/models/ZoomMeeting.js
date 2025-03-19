const mongoose = require('mongoose');

const zoomMeetingSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
  },
  meetingId: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
},
  startTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  joinUrl: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentsAllowed: [{
    type: String, // Student IDs
  }],
}, { timestamps: true });

module.exports = mongoose.model('ZoomMeeting', zoomMeetingSchema);