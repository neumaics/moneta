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
    const response = await axios.get(`${this.endpoint}/pubticker/${this.formatPair(pair)}`);
    const data = response.data;

    return new Ticker('bitfinex', data.timestamp, pair, data.bid, data.ask);
  }

  formatPair(pair) {
    return pair.replace('_', '');
  }
}

module.exports = BitfinexService;
