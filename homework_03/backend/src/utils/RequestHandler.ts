import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';

type TControllerFunction = (
  req: any,
  res: ExpressResponse,
  next: NextFunction,
) => Promise<any>;

export function requestHandler(controllerFn: TControllerFunction) {
  return async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction,
  ) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}
