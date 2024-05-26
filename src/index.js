const express = require('express');
const runPuppeteer = require('./connected_app.js');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, from Kevan!');
});

app.get('/setup', async (req, res) => {
  const url = req.query.url; // Get the URL from the query parameters
  if (!url) {
    return res.status(400).send('URL query parameter is required');
  }

  try {
    await runPuppeteer(url);
    res.send('Headless browser setup completed!');
  } catch (error) {
    console.error('Error running Puppeteer script:', error);
    res.status(500).send('An error occurred while running the Puppeteer script');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
