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
      const bitfinex = this.bitfinexService.getTicker(pair);
      const bittrex = this.bittrexService.getTicker(pair);

      Promise.all([bitfinex, poloniex, bittrex])
        .then((tickers) => {
          return res.json(this.markBest(tickers));
        })
        .catch(next);
    };
  }

  markBest(tickers) {
    const min = tickers
      .filter((ticker) => {
        return !ticker.hasOwnProperty('error');
      })
      .reduce((a, b) => {
        return a.ask <= b.ask ? a : b;
      });

    min.best = true;
    return tickers;
  }
}

module.exports = TickerRoute;
