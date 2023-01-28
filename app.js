// Import the necessary modules
const express = require('express');
const request = require('request');
const app = express();

// Set up the API endpoint for fetching the dropdown options
app.get('/api/dropdown', (req, res) => {
    // Make the API request to fetch the dropdown options
    request('https://api.example.com/dropdown', (error, response, body) => {
        // If there is no error, send the options back to the client
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send('Error fetching dropdown options');
        }
    });
});

// Serve the HTML file with the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// <!-- HTML form  -->
<form>
  <label for="dropdown">Select an option:</label>
  <select id="dropdown">
    <option value="" disabled selected>Loading options...</option>
  </select>
</form>

<!-- JavaScript to fetch and populate the options -->
<script>
  // Fetch the options from the API
  fetch('/api/dropdown')
    .then(response => response.json())
    .then(data => {
      // Get the dropdown element
      const dropdown = document.getElementById('dropdown');

      // Remove the loading option
      dropdown.innerHTML = '';

      // Loop through the options and add them to the dropdown
      data.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.innerHTML = option.label;
        dropdown.appendChild(optionElement);
      });
    })
    .catch(error => {
      console.error('Error fetching options:', error);
    });
</script>
