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
    const response = await axios.get(`${this.endpoint}/?command=returnTicker`);

    const data = response.data[pair];
    const bid = parseFloat(data.highestBid);
    const ask = parseFloat(data.lowestAsk);

    const ticker = new Ticker('poloniex', new Date(), pair, bid, ask);

    return ticker;
  }
}

module.exports = PoloniexService;
