const PoloniexService = require('../services/poloniex');

class InstrumentsRoute {
  constructor(endpoints) {
    this.poloniexService = new PoloniexService(endpoints.poloniex);
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
