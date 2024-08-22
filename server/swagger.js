const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const user = require('./routes/auth')
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Title',
    version: '1.0.0',
    description: 'A description of your API',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};


const options = {
  swaggerDefinition,
  
  apis: ["./routes/*.js"], 
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
