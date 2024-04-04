import { Request, Response, NextFunction } from 'express';

export function processRecipeRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.body.ingredients = JSON.parse(req.body.ingredients);
  req.body.tags = JSON.parse(req.body.tags);
  req.body.prepTime = parseInt(req.body.prepTime);
  req.body.cookTime = parseInt(req.body.cookTime);
  req.body.servings = parseInt(req.body.servings);
  next();
}
