const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    apis: ['./app.js',
        './routes/auth.routes.js',
        './routes/settings.routes.js',
        './client/src/routes.js'], //where are APIs at
    basePath: '/',
    swaggerDefinition: {
        info: {
            title: 'SignLangs API',
            description: 'SignLangs API Documentation',
            swagger: '2.0',
            contact: {
                name: "Akhromova Iuliia"
            },
            servers: ["http://localhost:5000"],
        },
    },
};

const specs /*swaggerDocs*/ = swaggerJsDoc(swaggerOptions);

export default specs;