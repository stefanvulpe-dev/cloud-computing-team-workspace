import { Router } from 'express';
import { FeedbackController } from '../controllers';
import { validateRequest } from '../middlewares';
import { CreateFeedbackRequestSchema, requestHandler } from '../utils';

export const feedbackRouter = Router();

/**
 * @openapi
 * /api/v1/feedback:
 *   post:
 *     tags:
 *       - Feedback
 *     description: Create a new feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFeedbackRequest'
 *     responses:
 *       '201':
 *         description: Feedback created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

feedbackRouter.post(
  '/',
  validateRequest(CreateFeedbackRequestSchema),
  requestHandler(FeedbackController.createFeedback),
);
