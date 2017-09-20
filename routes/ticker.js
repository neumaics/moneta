const Promise = require("bluebird");
const PoloniexService = require('../services/poloniex');
const BitfinexService = require('../services/bitfinex');
const BittrexService = require('../services/bittrex');

class TickerRoute {
  constructor(endpoints) {
    this.poloniexService = new PoloniexService(endpoints.poloniex);
    this.bitfinexService = new BitfinexService(endpoints.bitfinex);
    this.bittrexService = new BittrexService(endpoints.bittrex);
  }

  get() {
    return (req, res, next) => {
      const pair = req.params.pair;
      const poloniex = this.poloniexService.getTicker(pair);
      // const bitfinex = this.bitfinexService.getTicker(pair);
      const bittrex = this.bittrexService.getTicker(pair);

      Promise.all([poloniex, bittrex])
        .then((ticker) => {
          return res.json(ticker);
        })
        .catch(next);
    };
  }
}

module.exports = TickerRoute;
