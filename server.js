
const express = require('express');
const bodyParser = require('body-parser');
const {translate} = require('@vitalets/google-translate-api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
  try {

    if (!req.body || !req.body.text) {
      return res.status(400).json({ error: 'Missing or invalid request body. Please provide a JSON object with a "text" key.' });
    }

    const { text } = req.body;
    
    // Perform translation
    const translation = await translate(text, { to: 'fr' });
    
    // Send translated text in response
    res.json({ translation: translation.text });
  } catch (error) {
    // Handle errors during translation
    console.error('Error during translation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});