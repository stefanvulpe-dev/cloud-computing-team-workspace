import { z } from 'zod';
import { CreateFeedbackRequestSchema } from '../utils';

export type TCreateFeedback = z.infer<
  typeof CreateFeedbackRequestSchema
>['body'];
