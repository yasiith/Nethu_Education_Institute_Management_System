const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address.'], // Regex for email validation
  },
  StudentID: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple users with TeacherID while having unique StudentIDs
  },
  TeacherID: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple users with StudentID while having unique TeacherIDs
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student',
  },
  zoomEmail: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
