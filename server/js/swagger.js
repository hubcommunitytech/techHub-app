const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TechHub API',
      version: '1.0.0',
      description: 'API para gerenciar itens do TechHub',
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000"
      },
    ],
  },
  apis: ['./server/js/server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
