import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { TCreateFeedback } from '../types';
import { Result } from '../utils';

export class FeedbackRepository {
     private prismaClient: PrismaClient<
          Prisma.PrismaClientOptions,
          never,
          DefaultArgs
     >;

     constructor(
          prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
     ) {
          this.prismaClient = prismaClient;
     }

     async create(feedback: TCreateFeedback): Promise<Result<void>> {
          const { email, ...feedback_message } = feedback;
          
          const result = await this.prismaClient.feedback.create({
               data: {
                    email,
                    ...feedback_message,
               },
          });

          return Result.ok(result, 'Feedback created successfully');
     }
}