const express = require('express');
const randomWords = require('random-words');

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static('.'));

// Endpoint to get a random word
app.get('/random-word', (req, res) => {
  try {
    // The correct usage is to call the 'generate' function on the imported object
    const word = randomWords.generate();
    res.send(word);
  } catch (error) {
    console.error('Error generating random word:', error);
    res.status(500).send('Error generating word');
  }
});

app.listen(port, () => {
  console.log(`JagType server listening at http://localhost:${port}`);
});