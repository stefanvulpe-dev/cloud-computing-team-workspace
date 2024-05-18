import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { authRouter, recipeRouter } from './routes';
import { RedisService } from './services';
import { errorHandler, logger } from './utils';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const app = express();

const PORT = process.env.PORT || 3000;

// Initialize Redis
await RedisService.getInstance();

// Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TastyBites APIs',
            version: '1.0.0',
            description: 'All endpoints for TastyBites APIs',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./src/routes/*.ts', './src/app.ts', './src/utils/zod-schemas/*.ts']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check endpoint
/**
 * @openapi
 * /:
 *  get:
 *      tags: 
 *        - HealthCheck
 *      description: Responds with healthy if the server is running
 *      responses:
 *          '200':
 *              description: Healthy 
 */
app.get('/', (req, res) => {
    res.status(200).send('healthy');
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/recipes', recipeRouter);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
