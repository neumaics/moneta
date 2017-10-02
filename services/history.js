const TickerService = require('./ticker');
const mongoose = require('mongoose');

const Ticker = mongoose.model('Ticker', {
  exchanges: [{ name: String, bid: Number, ask: Number }],
  timestamp: Date,
  pair: String
});

/**
 * At a regular interval, poll the exchanges for ticker data
 *
 * @param endpoints Object endpoints for exchanges
 * @param dataconfig Object database configuration information
 * @param interval Number the time in milliseconds between polling the exchanges
 */
class HistoryService {

  constructor(endpoints, dataconfig, interval) {
    this.tickerService = new TickerService(endpoints);
    this.interval = interval;

    mongoose.Promise = require('bluebird');
    mongoose.connect(`mongodb://${dataconfig.host}/tickers`, { useMongoClient: true });
  }

  /**
   * Start the historical data system.
   */
  start() {
    // TODO: use more accurate timing.
    this.active = setInterval(() => this.queryServices(['BTC_ETH', 'BTC_LTC', 'BTC_DASH']), this.interval);
  }

  /**
   * Stop the historical data system.
   */
  stop() {
    if (this.active) {
      clearInterval(this.active);
      this.active = null;
    }
  }

  /**
   * Query the exchanges for the ticker data for a particular currency pair.
   *
   * @param pair string[] - the currency pairs to the query the exchanges' ticker service.
   */
  queryServices(pairs) {
    pairs.forEach((pair) => {
      this.tickerService.forPair(pair)
        .then((tickers) => {
          const datapoint = {
            timestamp: new Date(),
            pair: pair,
            exchanges: tickers
              .filter((ticker) => !ticker.hasOwnProperty('error'))
              .map((ticker) => {
                return {
                  name: ticker.exchange,
                  bid: ticker.bid,
                  ask: ticker.ask
                };
              })
          };

          return new Ticker(datapoint).save();
        })
        .catch((error) => {
          console.error(`error querying ticker for ${pair}: ${error}`);
        });
    });
  }

  /**
   * Query the database for historical data
   *
   * @param pair string - the pair to query
   * @param from string - the datestring to start the time interval
   * @param to string - the datestring to end the time interval
   * @param callback function
   */
  queryInterval(pair, from, to, callback) {
    Ticker.where('timestamp').gte(new Date(from)).lte(new Date(to))
      .where('pair').eq(pair)
      .exec(callback);
  }
}

module.exports = HistoryService;
