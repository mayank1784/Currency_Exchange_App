(() => {

        // Dependency
        const request = require('request');

        //API object:
        let api = {};
   
        // API base URL:
        api.base_url = 'https://openexchangerates.org/api/latest.json';
       
        // The default base currency ('USD'):
        api.base = 'USD';

        // Function to set App id or say Api key
        api.set = (opts) => {
             api.app_id = opts.app_id;

             return api;
        };
       
       // Function to get Exchange rates
       api.getExchangeRate = (currencies) => {
           return new Promise( (resolve, reject) => {
               let endpoint = `${api.base_url}`
                   +`?app_id=${api.app_id}`
                   +`&base=${api.base}`
                   +`&symbols=${currencies.join(',')}`
                   +`&prettyprint=false`;
               let headers = { 'Content-Type': 'application/json' };
               let openExchangeApi = {
                   url: endpoint,
                   headers: headers
               };
               request(openExchangeApi, (error, response) => {
                   if(error) {
                       reject(error);
                   } else {
                       if(response.statusCode == 200){
                           resolve(JSON.parse(response.body));
                       } else {
                           reject(JSON.parse(response.body));
                       }
                   }
               });
           });
       };

       //Export the API object
       module.exports = api;

})();
