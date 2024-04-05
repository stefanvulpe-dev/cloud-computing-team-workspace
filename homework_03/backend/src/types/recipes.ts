import { z } from 'zod';
import { CreateRecipeRequestSchema } from '../utils';

export type TRecipe = z.infer<typeof CreateRecipeRequestSchema>['body'] & {
  id?: string;
  image: string;
};

export type TCreateRecipe = z.infer<
  typeof CreateRecipeRequestSchema
>['body'] & {
  id?: string;
  file: Express.Multer.File;
};
