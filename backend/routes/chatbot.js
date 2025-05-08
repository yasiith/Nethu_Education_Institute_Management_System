// backend/routes/chatbot.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const EducationalContent = require('../models/educationalContent');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Available Gemini models - using correct model IDs
const MODEL_LIST = {
  PRIMARY: "gemini-pro",          // Primary model - more widely available
  ALTERNATIVE: "gemini-1.5-flash" // Alternative if primary fails
};

// Function to search educational content
const searchEducationalContent = async (query, grade) => {
  try {
    // First try an exact topic match
    let results = await EducationalContent.find({
      topic: { $regex: new RegExp(query, 'i') },
      grade: grade
    }).limit(3);
    
    // If no results, try keyword search
    if (results.length === 0) {
      results = await EducationalContent.find({
        keywords: { $in: query.split(' ').map(word => new RegExp(word, 'i')) },
        grade: grade
      }).limit(3);
    }
    
    // If still no results, try text search
    if (results.length === 0 && query.length > 0) {
      // Only perform text search if we have a text index
      try {
        const indexes = await EducationalContent.collection.indexes();
        const hasTextIndex = indexes.some(index => index.textIndexVersion);
        
        if (hasTextIndex) {
          results = await EducationalContent.find(
            { $text: { $search: query }, grade: grade },
            { score: { $meta: "textScore" } }
          ).sort({ score: { $meta: "textScore" } }).limit(3);
        }
      } catch (indexErr) {
        console.error('Error checking text indexes:', indexErr);
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error searching educational content:', error);
    return [];
  }
};

// Simple fallback response function when AI is unavailable
const generateFallbackResponse = (userMessage, relevantContent, grade) => {
  // If we have relevant content, use it to provide a basic response
  if (relevantContent && relevantContent.length > 0) {
    const content = relevantContent[0];
    return `I found some information about ${content.topic} for grade ${grade} students:\n\n${content.content.substring(0, 300)}...\n\n(Note: This is a simplified response while our AI system is busy. Please try again in a few minutes for a more detailed answer.)`;
  }
  
  // Generic fallback response
  return `I'm sorry, but our AI assistant is currently experiencing high demand. Please try again in a few minutes. In the meantime, you might want to check your textbooks or class notes for information about "${userMessage}".`;
};

// Main chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { userMessage, grade, chatHistory = [] } = req.body;
    
    // Check if we have grade information and message
    if (!userMessage || !userMessage.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const studentGrade = grade || 5; // Default to grade 5 if not specified
    
    // Search for relevant educational content in our database
    const relevantContent = await searchEducationalContent(userMessage, studentGrade);
    
    // Prepare context for the AI
    let context = "";
    if (relevantContent && relevantContent.length > 0) {
      context = relevantContent.map(item => 
        `Topic: ${item.topic}\nGrade: ${item.grade}\nContent: ${item.content.substring(0, 800)}`
      ).join('\n\n');
    }
    
    // Create system message with instructions
    const systemPrompt = `You are an educational assistant for grade ${studentGrade} students. 
Your goal is to help them learn and understand their school subjects.
Answer in a friendly, engaging way appropriate for their age level.
Keep explanations clear and concise.
If you don't know an answer, suggest where they might find it rather than making up information.
Use examples to illustrate concepts when helpful.`;

    // Prepare the complete prompt with context
    let promptContent = '';
    if (context) {
      promptContent = `${systemPrompt}\n\nHere is relevant educational content to help answer: ${context}\n\nStudent question: ${userMessage}`;
    } else {
      promptContent = `${systemPrompt}\n\nStudent question: ${userMessage}`;
    }
    
    // Try different models with error handling
    let aiResponse = null;
    let isLimitedResponse = false;
    
    try {
      // Try with primary model first
      const model = genAI.getGenerativeModel({ model: MODEL_LIST.PRIMARY });
      const result = await model.generateContent(promptContent);
      aiResponse = result.response.text();
    } catch (primaryModelError) {
      console.log('Primary model error:', primaryModelError.message || primaryModelError);
      
      try {
        // Try with alternative model if primary fails
        const alternativeModel = genAI.getGenerativeModel({ model: MODEL_LIST.ALTERNATIVE });
        const alternativeResult = await alternativeModel.generateContent(promptContent);
        aiResponse = alternativeResult.response.text();
      } catch (alternativeModelError) {
        console.log('Alternative model error:', alternativeModelError.message || alternativeModelError);
        
        // If both models fail, use fallback response
        aiResponse = generateFallbackResponse(userMessage, relevantContent, studentGrade);
        isLimitedResponse = true;
      }
    }
    
    // Return the response
    return res.json({ 
      reply: aiResponse,
      hasRelevantContent: relevantContent.length > 0,
      topicFound: relevantContent.length > 0 ? relevantContent[0].topic : null,
      isLimitedResponse
    });
    
  } catch (error) {
    console.error('Chatbot Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint to fetch related questions for a topic
router.get('/relatedQuestions/:topic', async (req, res) => {
  try {
    const { topic } = req.params;
    const { grade } = req.query;
    
    const content = await EducationalContent.findOne({ 
      topic: { $regex: new RegExp(topic, 'i') },
      grade: parseInt(grade) || { $exists: true }
    });
    
    if (content && content.questions && content.questions.length > 0) {
      res.json({ questions: content.questions });
    } else {
      res.json({ questions: [] });
    }
  } catch (error) {
    console.error('Error fetching related questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Optional: Add an admin endpoint to add educational content
router.post('/admin/content', async (req, res) => {
  try {
    // Check for admin auth (implement proper authentication)
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const newContent = new EducationalContent(req.body);
    await newContent.save();
    
    res.status(201).json({ message: 'Content added successfully', content: newContent });
  } catch (error) {
    console.error('Error adding content:', error);
    res.status(500).json({ error: 'Failed to add content' });
  }
});

module.exports = router;