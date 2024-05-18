import { Router } from 'express';
import { validateRequest } from '../middlewares';
import { requestHandler, LoginSchema, RegisterSchema } from '../utils';
import { AuthController } from '../controllers';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(RegisterSchema),
  requestHandler(AuthController.register),
);

authRouter.post(
  '/login',
  validateRequest(LoginSchema),
  requestHandler(AuthController.login),
);
