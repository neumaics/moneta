const express = require('express');
const app = express();

const config = require('./config');

const Instruments = require('./routes/instruments');
const Ticker = require('./routes/ticker');

app.use(express.static('public'));

app.get('/instruments', new Instruments(config.endpoints).get());

app.get('/ticker/:pair', new Ticker(config.endpoints).get());

app.listen(config.server.port);
