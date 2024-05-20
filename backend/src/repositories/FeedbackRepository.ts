import { PrismaClient } from '@prisma/client';
import { TCreateFeedback } from '../types';
import { Result } from '../utils';

export class FeedbackRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async create(feedback: TCreateFeedback) {
    const { firstName, lastName, ...rest } = feedback;
    const result = await this.prismaClient.feedback.create({
      data: {
        ...rest,
      },
    });

    return Result.ok(result, 'Feedback created successfully');
  }
}
