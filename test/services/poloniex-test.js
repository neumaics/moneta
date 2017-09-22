const nock = require('nock');
const PoloniexService = require('../../services/poloniex');


describe('Poloniex service', () => {
  const endpoint = 'https://dummypoloniex.com';
  const poloniexService = new PoloniexService(endpoint);

  describe('getTicker', () => {
    it('should return the ticker for the provided currency pair', (done) => {
      const poloniex = nock(endpoint)
        .get('/?command=returnTicker')
        .reply(200, { BTC_ETH: '100' });

      poloniexService.getTicker('BTC_ETH')
        .then((response) => {
          expect(response).toBe('100');
          poloniex.done();
        })
        .then(done)
        .catch(done.fail);
    });
  });
});
