import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateFeedbackRequest:
 *       type: object
 *       required:
 *         - email
 *         - feedback
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         feedback:
 *           type: string
 *           description: Feedback message
 *           minLength: 1
 *           default: "Feedback message"
 */

export const CreateFeedbackRequestSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      rating: z.number(),
      message: z.string(),
    })
    .required(),
});
