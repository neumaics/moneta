const express = require('express');
const app = express();

const config = require('./config');

const Instruments = require('./routes/instruments');
const Ticker = require('./routes/ticker');
const History = require('./routes/history');

app.use(express.static('public'));

app.get('/instruments', new Instruments(config.endpoints).instruments());

app.get('/ticker/:pair', new Ticker(config.endpoints).forPair());

app.get('/history/:pair/:from/:to', new History(config.endpoints, config.mongo).interval());

app.listen(config.server.port);
