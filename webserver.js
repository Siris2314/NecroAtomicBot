// webserver.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello World! Your Discord bot is running.');
});

// Start the web server
app.listen(port, () => {
  console.log(`Web server is listening on port ${port}`);
});

// Start your Discord bot
require('./index.js');
