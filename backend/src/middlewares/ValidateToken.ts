import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
import { Result } from '../utils';

const claims = ['id', 'email', 'firstName', 'lastName'];

export async function validateToken(
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json(Result.failWithMessage('Authorization header is missing'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json(
          Result.failWithMessage(
            `Invalid token. Please respect the format "Bearer <token>"`,
          ),
        );
    }

    const payload: jwt.JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload;

    if (!('user' in payload)) {
      return res
        .status(401)
        .json(
          Result.failWithMessage('Invalid token. Missing required claim user'),
        );
    }

    if (!claims.every((claim) => payload.user[claim])) {
      return res
        .status(401)
        .json(
          Result.failWithMessage(
            'Invalid token. Missing required claims: userId, email, firstName, lastName',
          ),
        );
    }

    req.user = {
      ...payload.user,
    };

    return next();
  } catch (error) {
    return next(error);
  }
}
