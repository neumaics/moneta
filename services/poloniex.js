const axios = require('axios');
const Ticker = require('../models/ticker');

class PoloniexService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getSupportedInstruments() {
    const response = await axios.get(`${this.endpoint}/?command=returnCurrencies`);

    return response.data;
  }

  async getTicker(pair) {
    try {
      const response = await axios.get(`${this.endpoint}/?command=returnTicker`);
      const data = response.data[pair];
      const bid = parseFloat(data.highestBid);
      const ask = parseFloat(data.lowestAsk);

      return new Ticker('poloniex', new Date(), pair, bid, ask);
    } catch (ex) {
      return { error: 'error calling poloniex' };
    }
  }
}

module.exports = PoloniexService;
