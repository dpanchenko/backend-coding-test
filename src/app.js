const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');

const healthRouter = require('./routes/health');
const ridesRouter = require('./routes/rides');
const { expressLogger } = require('./logger');
const swaggerSpecification = require('./swagger');

const app = express();

app.use(expressLogger);
app.use(bodyParser.json());

app.use(healthRouter);
app.use(ridesRouter);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification));

module.exports = app;
