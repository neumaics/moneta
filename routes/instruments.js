const PoloniexService = require('../services/poloniex');

class InstrumentsRoute {
  constructor(endpoint) {
    this.poloniexService = new PoloniexService(endpoint);
  }

  get() {
    return (req, res, next) => {
      this.poloniexService
        .getSupportedInstruments()
        .then((currencies) => {
          return res.json(currencies);
        })
        .catch(next);
    };
  }
}

module.exports = InstrumentsRoute;
