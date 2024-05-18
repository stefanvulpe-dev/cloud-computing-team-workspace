import { AnyZodObject } from 'zod';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';

export function validateRequest(schema: AnyZodObject) {
  return async (
    req: ExpressRequest,
    _res: ExpressResponse,
    next: NextFunction,
  ) => {
    try {
      await schema.parseAsync(req);
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
