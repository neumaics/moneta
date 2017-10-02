const HistoryService = require('../services/history');

class HistoryRoute {
  constructor(endpoints, dataconfig, interval = 10000) {
    this.history = new HistoryService(endpoints, dataconfig, interval);
    this.history.start();
  }

  interval() {
    return (req, res, next) => {
      const { pair, from, to } = req.params;

      this.history.queryInterval(pair, from, to, (err, docs) => {
        if (err) return next(err);

        const history = docs.map((doc) => {
          return {
            exchanges: doc.exchanges.map((exchange) => {
              return {
                name: exchange.name,
                bid: exchange.bid,
                ask: exchange.ask
              };
            }),
            timestamp: doc.timestamp,
            pair: doc.pair,
          };
        });

        res.json(history);
      });
    };
  }
}

module.exports = HistoryRoute;
