import { logger } from './logger';
import { z } from 'zod';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
import { Result } from './Result';

export function errorHandler(
  err: any,
  _req: ExpressRequest,
  res: ExpressResponse,
  _next: NextFunction,
) {
  if (err instanceof z.ZodError) {
    const errors = err.format();
    logger.error(errors);
    return res
      .status(400)
      .json(Result.fail('Validation errors occurred', 400, errors));
  }

  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError ||
    err instanceof jwt.NotBeforeError
  ) {
    logger.error(err.message);
    return res.status(401).json(Result.failWithMessage(err.message));
  }

  if (err instanceof Error) {
    logger.error(err.message);
    return res.status(500).json(Result.failWithMessage(err.message));
  }

  logger.error(err);
  return res.status(500).json(Result.failWithMessage('Internal server error'));
}
