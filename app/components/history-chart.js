import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const propTypes = {
  pair: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default class HistoryChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  componentDidMount() {
    const { pair, from, to } = this.props;

    axios.get(`/history/${pair}/${from}/${to}`)
      .then((response) => {

        const history = response.data.map((datapoint) => {

          const exchange = datapoint.exchanges.reduce((acc, cur) => {
            acc[cur.name] = cur.ask;
            return acc;
          }, {});

          exchange.timestamp = datapoint.timestamp;
          return exchange;
        });

        this.setState({ history });
      });
  }

  render () {
    const { history } = this.state;

    return (
      <LineChart width={600} height={300} data={history} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="timestamp" label="time" hide={true} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="bittrex" stroke="#F44336" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="bitfinex" stroke="#2196F3" />
        <Line type="monotone" dataKey="poloniex" stroke="#4CAF50" />
      </LineChart>
    );
  }
}

HistoryChart.propTypes = propTypes;
