import React from 'react';
import axios from 'axios';

const propTypes = {
  pair: React.PropTypes.string.isRequired
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

    return (
      <div>
        <h4>{pair}</h4>
        {echangeElements}
      </div>
    );
  }
}

CurrencyPair.propTypes = propTypes;
