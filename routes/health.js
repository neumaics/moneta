class HealthRoute {
  constructor() {
    return (req, res) => {
      res.json({ status: 'ok' });
    };
  }
}

module.exports = HealthRoute;
