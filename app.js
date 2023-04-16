// Import the necessary modules
const express = require("express");
const request = require("request");
const https = require("https");
const ejs = require("ejs");
const appid = "f5acb51cd0f141c0a19a43a5e5539fda";
const oxr = require("open-exchange-rate");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/currencies", (req, res) => {
  // Make the API request to fetch the currencies
  request(
    "https://openexchangerates.org/api/currencies.json",
    (error, response, body) => {
      // If there is no error, send the currencies back to the client
      if (!error && response.statusCode === 200) {
        res.send(body);
      } else {
        res.send("Error fetching currencies");
      }
    }
  );
});

// Serve the HTML file with the form
app.get("/", (req, res) => {
  res.render("index", {amount: 0.00});
});
app.post("/", function (req, res) {
  var amount = req.body.Amount;
  var fromCountry = req.body.fromCountry;
  var toCountry = req.body.toCountry;
  oxr.set({ app_id: appid });

  let currencies = [fromCountry, toCountry];
  oxr
    .getExchangeRate(currencies)
    .then(({ rates }) => {
      var rateToExchange = rates[toCountry] / rates[fromCountry];
      var convertedAmount = (amount / rates[fromCountry]) * rates[toCountry];
      console.log(rateToExchange);
      console.log(convertedAmount); // { CAD: 1.342507, EUR: 0.896797}
      res.render("index", {amount: convertedAmount});
    })
    .catch((err) => {
      console.log("Error :: ", err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
