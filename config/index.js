require('dotenv').config();

module.exports = {
  server: {
    port: process.env.SERVER_PORT
  },
  endpoints: {
    poloniex: process.env.POLONIEX,
    bitfinex: process.env.BITFINEX,
    bittrex: process.env.BITTREX
  }
};
