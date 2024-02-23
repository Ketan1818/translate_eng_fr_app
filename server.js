
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
    
   
    const translation = await translate(text, { to: 'fr' });
    

    res.json({ translation: translation.text });
  } catch (error) {

    console.error('Error during translation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
