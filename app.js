const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const xssClean = require('xss-clean');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(xssClean());

app.use(routes);

module.exports = app;
