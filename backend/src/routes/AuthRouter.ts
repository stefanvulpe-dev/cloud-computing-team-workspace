import { Router } from 'express';
import { validateRequest } from '../middlewares';
import { requestHandler, LoginSchema, RegisterSchema } from '../utils';
import { AuthController } from '../controllers';

export const authRouter = Router();

/**
  * @openapi
  * /api/v1/auth/register:
  *  post:
  *      tags: 
  *        - Auth
  *      description: Register a new user
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *               schema:
  *                $ref: '#/components/schemas/CreateUser'
  *      responses:
  *          '200':
  *              description: Register successful
  *          '400':
  *              description: Bad request
  *          '409':
  *              description: Email already taken
  *          '500':
  *              description: Internal server error
  * 
*/

authRouter.post(
  '/register',
  validateRequest(RegisterSchema),
  requestHandler(AuthController.register),
);

/**
  * @openapi
  * /api/v1/auth/login:
  *  post:
  *      tags: 
  *        - Auth
  *      description: Login a user
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *               schema:
  *                $ref: '#/components/schemas/LoginUser'
  *      responses:
  *          '200':
  *              description: Login successful message and token
  *          '400':
  *              description: Bad request
  *          '401':
  *              description: Unauthorized
  *          '500':
  *              description: Internal server error
  * 
*/

authRouter.post(
  '/login',
  validateRequest(LoginSchema),
  requestHandler(AuthController.login),
);
