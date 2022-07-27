import { Express, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import CONFIG from '../../config';
import { version } from '../../package.json';
import logger from './logger';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Propina Api Docs',
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/router/*.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Express) {
  //Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'appliction/json');
    res.send(swaggerSpec);
  });

  logger.info(`Docs availabel at ${CONFIG.url}/docs`);
}

export default swaggerDocs;
