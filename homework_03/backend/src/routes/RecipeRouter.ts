import { Router } from 'express';
import { validateRequest, validateToken } from '../middlewares';
import {
  CreateRecipeRequestSchema,
  CreateRecipeWithIdRequestSchema,
  requestHandler,
} from '../utils';
import { RecipeController } from '../controllers';

export const recipeRouter = Router();

recipeRouter.use(validateToken);

recipeRouter.post(
  '/',
  validateRequest(CreateRecipeRequestSchema),
  requestHandler(RecipeController.createRecipe),
);

recipeRouter.post(
  '/:id',
  validateRequest(CreateRecipeWithIdRequestSchema),
  requestHandler(RecipeController.createRecipeWithId),
);

recipeRouter.get('/', requestHandler(RecipeController.getRecipes));

recipeRouter.get(
  '/trending',
  requestHandler(RecipeController.getTrendingRecipes),
);

recipeRouter.get('/search', requestHandler(RecipeController.searchRecipes));

recipeRouter.get('/:id', requestHandler(RecipeController.getRecipe));

recipeRouter.put(
  '/:id',
  validateRequest(CreateRecipeWithIdRequestSchema),
  requestHandler(RecipeController.updateRecipe),
);

recipeRouter.put('/', requestHandler(RecipeController.updateAllRecipes));

recipeRouter.delete('/:id', requestHandler(RecipeController.deleteRecipe));

recipeRouter.delete('/', requestHandler(RecipeController.deleteAllRecipes));
