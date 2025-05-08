// backend/models/educationalContent.js
const mongoose = require('mongoose');

const educationalContentSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    index: true // For faster queries
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
    index: true
  },
  topic: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  keywords: {
    type: [String],
    index: true // For keyword searching
  },
  examples: [String],
  questions: [{
    question: String,
    answer: String
  }],
  relatedTopics: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create text index for full-text search
educationalContentSchema.index({ 
  content: 'text', 
  topic: 'text', 
  keywords: 'text' 
});

educationalContentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('EducationalContent', educationalContentSchema);