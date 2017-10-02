import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import HistoryChart from './history-chart';

const propTypes = {
  pair: PropTypes.string.isRequired
};

export default class CurrencyPair extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exchanges: []
    };
  }

  componentDidMount() {
    axios.get(`/ticker/${this.props.pair}`)
      .then((response) => {
        const exchanges = response.data;

        this.setState({ exchanges });
      });
  }

  render() {
    const { pair } = this.props;
    const [ base, quote ] = pair.split('_');
    const { exchanges } = this.state;

    const echangeElements = exchanges
      .filter((ticker) => !ticker.hasOwnProperty('error'))
      .map((ticker) => {
        const rate = 1 / ticker.ask;
        const style = { color: ticker.best ? 'green' : 'black' };

        return <h5 style={style} key={ticker.exchange}>{ticker.exchange}: 1 {base} / {rate} {quote}</h5>;
      });

    const cardStyle = {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      borderRadius: '5px',
      minHeight: '200px',
      maxWidth: '600px',
      margin: '15px'
    };

    const now = new Date();
    const lastWeek = new Date(now.getTime() - (604800 * 1000));

    return (
      <div style={cardStyle}>
        <div style={{padding: '15px'}}>
          <h4 style={{margin: 0}}>{pair}</h4>
          {echangeElements}
        </div>

        <HistoryChart pair={pair} from={lastWeek.toISOString()} to={now.toISOString()} />
      </div>
    );
  }
}

CurrencyPair.propTypes = propTypes;
