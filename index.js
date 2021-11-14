const express = require('express');
const process = require('process');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.listen(PORT, () => {
  console.log(`Listening all instances on port: ${PORT}`);
  console.log(`Current instance id: ${process.pid}`);
});
