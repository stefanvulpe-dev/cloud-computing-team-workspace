import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const CreateRecipeRequestSchema = z.object({
  user: z
    .object({
      id: z.string().refine(ObjectId.isValid, {
        message: 'Invalid ObjectId',
      }),
      email: z.string().email(),
      firstName: z.string().min(3),
      lastName: z.string().min(3),
    })
    .required(),
  body: z
    .object({
      title: z.string().min(3),
      description: z.string().min(3),
      ingredients: z.array(z.string()).min(1),
      prepTime: z.number().int().positive(),
      cookTime: z.number().int().positive(),
      servings: z.number().int().positive(),
      tags: z.array(z.string()).min(1),
    })
    .required(),
});

export const CreateRecipeWithIdRequestSchema = CreateRecipeRequestSchema.extend(
  {
    params: z.object({
      id: z.string().refine(ObjectId.isValid, {
        message: 'Invalid ObjectId',
      }),
    }),
  },
);
