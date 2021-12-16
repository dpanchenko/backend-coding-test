import swaggerJsdoc from 'swagger-jsdoc';

import config from './config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taxi',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Taxi Rides API',
      },
    ],
  },
  apis: [
    './src/app.js',
    './src/schemas.js',
    './src/routes/health.js',
    './src/routes/rides.js',
  ],
};

export default swaggerJsdoc(options);
