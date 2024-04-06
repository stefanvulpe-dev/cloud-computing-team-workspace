import { Response as ExpressResponse } from 'express';
import { z } from 'zod';
import { LoginSchema, RegisterSchema, Result } from '../utils';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories';
import { prisma } from '../prisma';
import { RedisService } from '../services';
import bcrypt from 'bcrypt';

export async function register(
  req: z.infer<typeof RegisterSchema>,
  res: ExpressResponse,
) {

  const redisClient = await RedisService.getInstance();
  const { email, password, ...rest } = req.body;

  if (await redisClient.get(email)) {
    const result = Result.fail('Email already exists', 409, {});
    return res.status(result.statusCode).json(result);
  }

  const userRepository = new UserRepository(prisma);

  const result = await userRepository.create(req.body);

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  const redisValue = { ...rest, id: result.value.id, hashedPassword: await bcrypt.hash(req.body.password, 10)}
  await redisClient.set(email, JSON.stringify(redisValue), { EX: +process.env.REDIS_TTL!});

  return res.json(result);
}

export async function login(
  req: z.infer<typeof LoginSchema>,
  res: ExpressResponse,
) {
  const { email, password } = req.body;

  const redisClient = await RedisService.getInstance();
  const user = JSON.parse(await redisClient.get(email));

  if (user && (await bcrypt.compare(password, user.hashedPassword))) {
    const { hashedPassword, ...userWithoutPassword } = user;
    const token = jwt.sign({ user: {...userWithoutPassword, email: email} }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

      return res.json(Result.ok({ token, user: {...userWithoutPassword, email: email}}, 'Login successful'));
    } 

  
  const userRepository = new UserRepository(prisma);

  const result = await userRepository.login(email, password);

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  const { email: userEmail, ...rest} = result.value;
  const redisValue = {...rest, hashedPassword: await bcrypt.hash(password, 10)}

  await redisClient.set(email, JSON.stringify(redisValue), { EX: +process.env.REDIS_TTL!});

  const token = jwt.sign({ user: result.value }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return res.json(Result.ok({ token, user: result.value }, 'Login successful'));
}
