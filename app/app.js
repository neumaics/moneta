import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyPair from './components/currency-pair';

ReactDOM.render(
  <CurrencyPair pair="BTC_ETH" />,
  document.getElementById('app')
);
