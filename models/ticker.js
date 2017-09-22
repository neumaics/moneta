class Ticker {
  constructor(exchange, timestamp, pair, bid, ask) {
    this.exchange = exchange;
    this.timestamp = timestamp;
    this.pair = pair;
    this.bid = bid;
    this.ask = ask;
  }
}

module.exports = Ticker;
