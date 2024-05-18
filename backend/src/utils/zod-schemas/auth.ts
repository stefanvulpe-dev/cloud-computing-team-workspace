import { z } from 'zod';

export const RegisterSchema = z.object({
  body: z
    .object({
      firstName: z.string().min(3),
      lastName: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    })
    .required(),
});

export const LoginSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .required(),
});
