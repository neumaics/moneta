const axios = require('axios');

class PoloniexService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getSupportedInstruments() {
    return axios.get(`${this.endpoint}/?command=returnCurrencies`)
      .then((response) => {
        return response.data;
      });
  }

  getTicker(pair) {
    return axios.get(`${this.endpoint}/?command=returnTicker`)
      .then((response) => {
        return response.data[pair];
      });
  }
}

module.exports = PoloniexService;
