const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Bookshelf API",
        description: "API for managing book collection",
    },
    host: "project1-ht4k.onrender.com",
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);