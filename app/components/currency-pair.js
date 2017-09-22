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
    axios.get(`/ticker/BTC_LTC`)
      .then((response) => {
        const exchanges = response.data;

        this.setState({ exchanges });
      });
  }

  render() {
    const { pair } = this.props;

    console.log(this.state);

    return <h5>{pair}</h5>;
  }
}

CurrencyPair.propTypes = propTypes;
