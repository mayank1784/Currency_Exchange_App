const oxr = require('open-exchange-rate');

oxr.set({ app_id: 'APP_ID_HERE' });

oxr.getExchangeRate(["CAD", "EUR", "GBP"]).then(({rates, timestamp}) => {
    console.log('Response :: \nRates',rates, '\nTimestamp', timestamp);
})
.catch(err => {
    console.log('Error :: ',err);
});

