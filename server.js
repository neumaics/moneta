const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ app: "moneta" });
});

app.listen(process.env.SERVER_PORT);
