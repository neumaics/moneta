const TickerService = require('./ticker');
const mongoose = require('mongoose');

const Ticker = mongoose.model('Ticker', {
  exchange: String,
  timestamp: Date,
  pair: String,
  bid: Number,
  ask: Number
});

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
    this.active = setInterval(() => this.queryServices('BTC_ETH'), this.interval);
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
   * @param pair string - the currency pair to the query the exchanges' ticker service.
   */
  queryServices(pair) {
    this.tickerService.forPair(pair)
      .then((tickers) => {
        return Ticker.insertMany(tickers);
      })
      .catch((error) => {
        console.error(`error querying ticker for ${pair}: ${error}`);
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
