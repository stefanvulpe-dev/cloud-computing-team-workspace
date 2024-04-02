import { z } from 'zod';
import { Result, RegisterSchema } from '../utils';
import { TUser } from '../types';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';

export class UserRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor(
    prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  ) {
    this.prismaClient = prismaClient;
  }

  async create(
    user: z.infer<typeof RegisterSchema>['body'],
  ): Promise<Result<TUser>> {
    const { email, password, firstName, lastName } = user;

    const existingUser = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Result.fail('User already exists', 409, {
        email: ['Email is already taken'],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const { password: _password, createdAt, updatedAt, ...newUser } = result;

    return Result.ok(newUser, 'User created successfully');
  }

  async findByEmail(email: string): Promise<TUser | null> {
    return this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<TUser | null> {
    return this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<TUser[]> {
    return this.prismaClient.user.findMany();
  }

  async login(email: string, password: string): Promise<Result<TUser>> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Result.fail('Invalid email or password', 401, {
        email: ['Invalid email or password'],
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Result.fail('Invalid email or password', 401, {
        email: ['Invalid email or password'],
        password: ['Invalid email or password'],
      });
    }

    const { password: _password, createdAt, updatedAt, ...newUser } = user;

    return Result.ok(newUser, 'User logged in successfully');
  }
}
