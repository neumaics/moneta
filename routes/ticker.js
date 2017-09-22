const TickerService = require('../services/ticker');

class TickerRoute {
  constructor(endpoints) {
    this.tickerService = new TickerService(endpoints);
  }

  forPair() {
    return (req, res, next) => {
      const pair = req.params.pair;

      return this.tickerService.forPair(pair)
        .then(tickers => {
          res.json(tickers);
        })
        .catch(next);
    };
  }
}

module.exports = TickerRoute;
