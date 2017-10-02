const express = require('express');
const app = express();

const config = require('./config');

const Instruments = require('./routes/instruments');
const Ticker = require('./routes/ticker');
const History = require('./routes/history');
const Health = require('./routes/health');
const ErrorHandler = require('./middleware/error-handler');

app.use(express.static('public'));

app.get('/health', new Health());

app.get('/instruments', new Instruments(config.endpoints).instruments());

app.get('/ticker/:pair', new Ticker(config.endpoints).forPair());

app.get('/history/:pair/:from/:to', new History(config.endpoints, config.mongo).interval());

app.use(new ErrorHandler());

app.listen(config.server.port);
