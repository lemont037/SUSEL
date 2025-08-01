const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API do SUSEL',
            version: '1.0.0',
            description: 'Documentação da API para o Sistema Unificado de Gestão Escolar (SUSEL).',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Desenvolvimento',
            },
        ],
    },
    // O caminho para os arquivos de rotas da aplicação
    // O asterisco indica que ele vai procurar em todos os arquivos .js dentro da pasta 'routes'
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;