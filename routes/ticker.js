const PoloniexService = require('../services/poloniex');

class TickerRoute {
  constructor(endpoint) {
    this.poloniexService = new PoloniexService(endpoint);
  }

  get() {
    return (req, res, next) => {
      const pair = req.params.pair;

      this.poloniexService
        .getTicker(pair)
        .then((ticker) => {
          return res.json(ticker);
        })
        .catch(next);
    };
  }
}

module.exports = TickerRoute;
