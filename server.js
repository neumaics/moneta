const express = require('express');
const app = express();

require('dotenv').config();

const Instruments = require('./routes/instruments');
const Ticker = require('./routes/ticker');

app.use(express.static('public'));

app.get('/instruments', new Instruments(process.env.POLONIEX).get());

app.get('/ticker/:pair', new Ticker(process.env.POLONIEX).get());

app.listen(process.env.SERVER_PORT);
