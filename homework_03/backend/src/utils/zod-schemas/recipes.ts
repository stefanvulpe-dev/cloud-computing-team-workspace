import { ObjectId } from 'mongodb';
import { z } from 'zod';

const multerFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.any().refine((value) => value instanceof Buffer),
  size: z.number(),
});

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
      ingredients: z
        .string()
        .transform((str) => JSON.parse(str))
        .refine((value: any) => {
          if (!Array.isArray(value)) {
            return false;
          }

          return value.length > 0;
        }),
      prepTime: z
        .string()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0),
      cookTime: z
        .string()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0),
      servings: z
        .string()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0),
      tags: z
        .string()
        .transform((str) => JSON.parse(str))
        .refine((value: any) => {
          if (!Array.isArray(value)) {
            return false;
          }

          return value.length > 0;
        }),
    })
    .required(),
  file: multerFileSchema,
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

export const GetRecipeAudioRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(ObjectId.isValid, {
      message: 'Invalid ObjectId',
    }),
  }),
});
