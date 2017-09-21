const axios = require('axios');
const Ticker = require('../models/ticker');

class BittrexService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getSupportedInstruments() {
    const response = await axios.get(`${this.endpoint}/public/getcurrencies`);

    return response.data;
  }

  async getTicker(pair) {
    try {
      const response = await axios.get(`${this.endpoint}/public/getticker?market=${this.formatPair(pair)}`);
      const data = response.data;

      return new Ticker('bittrex', new Date(), pair, data.result.Bid, data.result.Ask);
    } catch (ex) {
      return { error: 'error calling bittrex' };
    }
  }

  formatPair(pair) {
    return pair.replace('_', '-');
  }
}

module.exports = BittrexService;
