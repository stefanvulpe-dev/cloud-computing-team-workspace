import { Router } from 'express';
import { validateRequest } from '../middlewares';
import { AssistantRequestSchema } from '../utils';
import { AssistantController } from '../controllers';

export const assistantRouter = Router();

/**
 * @openapi
 * /api/v1/assistant:
 * post:
 *    tags:
 *      - Assistant
 *    description: Get assistant test response
 *    responses:
 *      '200':
 *         description: Assistant response
 *      '400':
 *         description: Bad request
 *      '500':
 *         description: Internal server error
 */
assistantRouter.post('/', AssistantController.GetTestResponse);

/**
 * @openapi
 * /api/v1/assistant/response:
 * post:
 *   tags:
 *    - Assistant
 *   description: Get assistant response
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *          schema:
 *              $ref: '#/components/schemas/AssistantRequest'
 *   responses:
 *      '200':
 *          description: Assistant response
 *      '400':
 *          description: Bad request
 *      '500':
 *          description: Internal server error
 */
assistantRouter.post(
  '/response',
  validateRequest(AssistantRequestSchema),
  AssistantController.GetAssistantResponse,
);
