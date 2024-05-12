import { z } from 'zod';


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           default: jon.doe@example.com
 *           format: email
 *         password:
 *           type: string
 *           default: password
 *           format: password
 *         firstName:
 *           type: string
 *           default: Jon
 *         lastName:
 *           type: string
 *           default: Doe
 */

export const RegisterSchema = z.object({
  body: z
    .object({
      firstName: z.string().min(3),
      lastName: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    })
    .required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: jon.doe@example.com
 *           format: email
 *         password:
 *           type: string
 *           default: password
 *           format: password
 */

export const LoginSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .required(),
});
