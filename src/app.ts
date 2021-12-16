import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import { healthRouter, ridesRouter } from './routes';
import { expressLogger }from './logger';
import { swaggerSpecification }  from './swagger';

export const app = express();

app.use(expressLogger);
app.use(bodyParser.json());

app.use(healthRouter);
app.use(ridesRouter);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification));
