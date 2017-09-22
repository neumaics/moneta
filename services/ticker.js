const Promise = require('bluebird');

const PoloniexService = require('../services/poloniex');
const BitfinexService = require('../services/bitfinex');
const BittrexService = require('../services/bittrex');

class TickerService {
  constructor(endpoints) {
    this.poloniexService = new PoloniexService(endpoints.poloniex);
    this.bitfinexService = new BitfinexService(endpoints.bitfinex);
    this.bittrexService = new BittrexService(endpoints.bittrex);
  }

  forPair(pair) {
    const poloniex = this.poloniexService.getTicker(pair);
    const bitfinex = this.bitfinexService.getTicker(pair);
    const bittrex = this.bittrexService.getTicker(pair);

    return Promise.all([bitfinex, poloniex, bittrex])
      .then((tickers) => {
        return this.markBest(tickers);
      });
  }

  /**
   * Given a list of ticker objects, mark the best exchange to use.
   *
   * @param tickers Ticker[] a list of tickers
   */
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

module.exports = TickerService;
