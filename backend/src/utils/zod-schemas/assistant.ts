import { z } from 'zod';

/**
 *    @openapi
 *    components:
 *      schemas:
 *        AssistantRequest:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              maxLength: 1000
 *          required:
 *            - message
 */
export const AssistantRequestSchema = z.object({
  body: z.object({
    message: z.string().max(1000),
  }),
});
