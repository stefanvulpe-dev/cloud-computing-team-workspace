import { z } from 'zod';
import { CreateRecipeRequestSchema } from '../utils';

export type TRecipe = z.infer<typeof CreateRecipeRequestSchema>['body'] & {
  id?: string;
  image: string;
};
