/* eslint-env browser */
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import CurrencyPair from './components/currency-pair';

ReactDOM.render(
  <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <CurrencyPair key="eth" pair="BTC_ETH" />
    <CurrencyPair key="ltc" pair="BTC_LTC" />
    <CurrencyPair key="dash" pair="BTC_DASH" />
  </div>,
  document.getElementById('app')
);
