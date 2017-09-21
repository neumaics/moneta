const axios = require('axios');
const Ticker = require('../models/ticker');

class BitfinexService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getSupportedInstruments() {
    const response = await axios.get(`${this.endpoint}/symbols`);

    return response.data;
  }

  async getTicker(pair) {
    try {
      const response = await axios.get(`${this.endpoint}/pubticker/${this.formatPair(pair)}`);
      const data = response.data;
      const bid = parseFloat(data.bid);
      const ask = parseFloat(data.ask);

      return new Ticker('bitfinex', data.timestamp, pair, bid, ask);
    } catch (ex) {
      return { error: 'error calling bitfinex' };
    }
  }

  formatPair(pair) {
    return pair.split('_').reverse().join('').toLowerCase();
  }
}

module.exports = BitfinexService;
