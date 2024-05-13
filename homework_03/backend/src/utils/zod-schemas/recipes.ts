import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     multerFile:
 *       type: object
 *       properties:
 *         fieldname:
 *           type: string
 *         originalname:
 *           type: string
 *         encoding:
 *           type: string
 *         mimetype:
 *           type: string
 *         buffer:
 *           type: string
 *           format: binary
 *         size:
 *           type: number
 */


const multerFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.any().refine((value) => value instanceof Buffer),
  size: z.number(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateRecipeRequest:
 *       type: object
 *       required:
 *         - user
 *         - body
 *       properties:
 *         user:
 *           type: object
 *           required:
 *             - id
 *             - email
 *             - firstName
 *             - lastName
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               description: User ID
 *             email:
 *               type: string
 *               format: email
 *               default: jon.doe@example.com
 *             firstName:
 *               type: string
 *               minLength: 3
 *               default: Jon
 *             lastName:
 *               type: string
 *               minLength: 3
 *               default: Doe
 *         body:
 *           type: object
 *           required:
 *             - title
 *             - description
 *             - ingredients
 *             - prepTime
 *             - cookTime
 *             - servings
 *             - tags
 *           properties:
 *             title:
 *               type: string
 *               minLength: 3
 *               default: "Recipe title"
 *             description:
 *               type: string
 *               minLength: 3
 *               default: "Recipe description"
 *             ingredients:
 *               type: array
 *               items:
 *                 type: string
 *               minItems: 1
 *             prepTime:
 *               type: integer
 *               minimum: 1
 *               default: 1
 *             cookTime:
 *               type: integer
 *               minimum: 1
 *               default: 1
 *             servings:
 *               type: integer
 *               minimum: 1
 *               default: 1
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               minItems: 1
 */


export const CreateRecipeRequestSchema = z.object({
  user: z
    .object({
      id: z.string().uuid(),
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
  file: multerFileSchema.optional(),
});


export const CreateRecipeWithIdRequestSchema = CreateRecipeRequestSchema.extend(
  {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
);

/**
 * @openapi
 * components:
 *   schemas:
 *     GetRecipeAudio:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 *           minLength: 3
 *           default: "Hello, world!"
 */


export const GetRecipeAudioRequestSchema = z.object({
  body: z.object({
    text: z.string().min(3),
  }),
});
