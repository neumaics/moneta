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
    const response = await axios.get(`${this.endpoint}/public/getticker?market=${this.formatPair(pair)}`);
    const data = response.data;
    
    return new Ticker('bittrex', new Date(), pair, data.result.Bid, data.result.Ask);
  }

  formatPair(pair) {
    return pair.replace('_', '-');
  }
}

module.exports = BittrexService;
