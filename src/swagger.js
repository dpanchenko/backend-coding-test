const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taxi',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8010',
        description: 'Taxi Rides API',
      },
    ],
  },
  apis: ['./src/app.js'],
};

module.exports = swaggerJsdoc(options);
