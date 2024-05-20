import {
     Request as ExpressRequest,
     Response as ExpressResponse,
} from 'express';

import { z } from 'zod';
import { prisma } from '../prisma';
import { FeedbackRepository } from '../repositories';
import { CreateFeedbackRequestSchema, Result } from '../utils';

export async function createFeedback(
     req: z.infer<typeof CreateFeedbackRequestSchema>,
     res: ExpressResponse,
) {
     const repository = new FeedbackRepository(prisma);

     const result = await repository.create(req.body);

     if (!result.isSuccess) {
          return res.status(result.statusCode).json(result);
     }

     return res.status(201).json(result);
}