# open-exchange-rate

This module is used to get the latest currency exchange rates from the [open exchange rates](https://openexchangerates.org/) public api.

## Getting Started

Install the module using the following command.

```
npm i open-exchange-rate
```

### Example

Below given is the example to use this package.

Note : USD is the base currency.

```
const oxr = require('open-exchange-rate');

oxr.set({ app_id: 'APP_ID_HERE' });

let currencies = ["CAD", "EUR"];

oxr.getExchangeRate(currencies).then(({rates}) => {
    console.log(rates); // { CAD: 1.342507, EUR: 0.896797}
})
.catch(err => {
    console.log('Error :: ',err);
});
```
Also please refer example.js file for an example.

Replace the APP_ID_HERE with your APP_ID or say API_KEY.

Use the below command to run the example.
```
node example.js
```

### Documentation

For further reference and for list of currencies, please refer the [documentation.](https://docs.openexchangerates.org/docs/latest-json)

## Authors

* **Vishweswaran P** - *Initial work* - [Github](https://github.com/vishweswaran-p)

## License

This project is licensed under the ISC License.

