'use strict';

const express = require('express');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = 8010;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const swaggerSpecification = require('./src/swagger');
const buildSchemas = require('./src/schemas');

db.serialize(() => {
    buildSchemas(db);

    const app = require('./src/app')(db);
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification));

    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});