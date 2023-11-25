const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Bookshelf API",
        description: "API for managing book collection",
    },
    //host: "project2-l54t.onrender.com",
    host: "localhost:3000",
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);