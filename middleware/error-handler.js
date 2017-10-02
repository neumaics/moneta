class ErrorHandler {
  constructor() {
    return (err, req, res, next) => { // eslint-disable-line no-unused-vars
      console.error(err);
      res.status(500).json({ error: err });
    };
  }
}

module.exports = ErrorHandler;
