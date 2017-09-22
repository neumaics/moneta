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

        res.json(docs);
      });
    };
  }
}

module.exports = HistoryRoute;
