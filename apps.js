const express = require('express');
const DataBase_Connection = require('./DataBase/database.js');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Local Server running on port:${port}`);
  DataBase_Connection();
});