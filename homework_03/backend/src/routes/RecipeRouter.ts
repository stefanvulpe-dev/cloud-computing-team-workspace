import { Router } from 'express';
import {
  processRecipeRequest,
  validateRequest,
  validateToken,
} from '../middlewares';
import {
  CreateRecipeRequestSchema,
  CreateRecipeWithIdRequestSchema,
  GetRecipeAudioRequestSchema,
  requestHandler,
} from '../utils';
import { RecipeController } from '../controllers';
import { upload } from '../services';
import { z } from 'zod';

export const recipeRouter = Router();

recipeRouter.use(validateToken);

recipeRouter.post(
  '/audio',
  validateRequest(GetRecipeAudioRequestSchema),
  requestHandler(RecipeController.getRecipeAudio),
);

recipeRouter.post(
  '/',
  upload.single('image'),
  validateRequest(CreateRecipeRequestSchema),
  processRecipeRequest,
  requestHandler(RecipeController.createRecipe),
);

recipeRouter.post(
  '/:id',
  upload.single('image'),
  validateRequest(CreateRecipeWithIdRequestSchema),
  processRecipeRequest,
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
  upload.single('image'),
  validateRequest(CreateRecipeWithIdRequestSchema),
  processRecipeRequest,
  requestHandler(RecipeController.updateRecipe),
);

recipeRouter.put('/', requestHandler(RecipeController.updateAllRecipes));

recipeRouter.delete('/:id', requestHandler(RecipeController.deleteRecipe));

recipeRouter.delete('/', requestHandler(RecipeController.deleteAllRecipes));
