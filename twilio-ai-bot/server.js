const express = require('express');
const openai = require('openai');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure OpenAI API key
openai.apiKey = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.Completion.create({
      engine: 'text-davinci-003',
      prompt: message,
      max_tokens: 150
    });
    const aiResponse = response.choices[0].text.trim();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error processing /chat request:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
