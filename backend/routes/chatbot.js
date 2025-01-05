// backend/routes/chatbot.js
const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { userMessage } = req.body;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: userMessage }),
      }
    );

    const result = await response.json();
    res.json({ reply: result[0].generated_text });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;