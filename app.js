// Import the necessary modules
const express = require('express');
const request = require('request');
const app = express();
const https = require('https');
app.use(express.static(__dirname + '/public')); 
app.get('/api/currencies', (req, res) => {
  // Make the API request to fetch the currencies
  request('https://openexchangerates.org/api/currencies.json', (error, response, body) => {
      // If there is no error, send the currencies back to the client
      if (!error && response.statusCode === 200) {
          res.send(body);
      } else {
          res.send('Error fetching currencies');
      }
  });
});

// Serve the HTML file with the form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(3000 || process.env.PORT, () => {
    console.log('Server listening on port 3000');
});

