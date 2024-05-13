import { Response as ExpressResponse } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../prisma';
import { UserRepository } from '../repositories';
import { LoginSchema, RegisterSchema, Result } from '../utils';

export async function register(
  req: z.infer<typeof RegisterSchema>,
  res: ExpressResponse,
) {
  const userRepository = new UserRepository(prisma);

  const result = await userRepository.create(req.body);

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.json(result);
}


export async function login(
  req: z.infer<typeof LoginSchema>,
  res: ExpressResponse,
) {
  const { email, password } = req.body;

  const userRepository = new UserRepository(prisma);

  const result = await userRepository.login(email, password);

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  const token = jwt.sign({ user: result.value }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return res.json(Result.ok({ token, user: result.value }, 'Login successful'));
}
