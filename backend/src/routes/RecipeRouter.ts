import { Router } from 'express';
import { RecipeController } from '../controllers';
import {
  processRecipeRequest,
  validateRequest,
  validateToken,
} from '../middlewares';
import { upload } from '../services';
import {
  CreateRecipeRequestSchema,
  CreateRecipeWithIdRequestSchema,
  GetRecipeAudioRequestSchema,
  requestHandler,
} from '../utils';

export const recipeRouter = Router();

recipeRouter.use(validateToken);

/**
 * @openapi
 * /api/v1/recipes/audio:
 *   post:
 *     tags:
 *       - Recipes
 *     description: Get audio for a recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetRecipeAudio'
 *     responses:
 *       '200':
 *         description: Audio generated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

recipeRouter.post(
  '/audio',
  validateRequest(GetRecipeAudioRequestSchema),
  requestHandler(RecipeController.getRecipeAudio),
);

/**
 * @openapi
 * /api/v1/recipes:
 *  post:
 *    tags:
 *      - Recipes
 *    description: Create a new recipe
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            allOf:
 *              - $ref: '#/components/schemas/CreateRecipeRequest'
 *              - $ref: '#/components/schemas/multerFile'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateRecipeRequest'
 *    responses:
 *      '201':
 *        description: Recipe created successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */

recipeRouter.post(
  '/',
  upload.single('image'),
  validateRequest(CreateRecipeRequestSchema),
  processRecipeRequest,
  requestHandler(RecipeController.createRecipe),
);

/**
 * @openapi
 * /api/v1/recipes/{id}:
 *  post:
 *    tags:
 *      - Recipes
 *    description: Create a new recipe with a specific id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of the recipe
 *        example: 123e4567-e89b-12d3-a456-426614174000
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            allOf:
 *              - $ref: '#/components/schemas/CreateRecipeRequest'
 *              - $ref: '#/components/schemas/multerFile'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateRecipeRequest'
 *    responses:
 *      '201':
 *        description: Recipe created successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */

recipeRouter.post(
  '/:id',
  upload.single('image'),
  validateRequest(CreateRecipeWithIdRequestSchema),
  processRecipeRequest,
  requestHandler(RecipeController.createRecipeWithId),
);

/**
 * @openapi
 * /api/v1/recipes:
 *  get:
 *    tags:
 *      - Recipes
 *    description: Get all recipes
 *    responses:
 *      '200':
 *        description: Recipes retrieved successfully
 *      '500':
 *        description: Internal server error
 */

recipeRouter.get('/', requestHandler(RecipeController.getRecipes));

/**
 * @openapi
 * /api/v1/recipes/trending:
 *  get:
 *    tags:
 *      - Recipes
 *    description: Get trending recipes
 *    responses:
 *      '200':
 *        description: Trending recipes retrieved successfully
 *      '500':
 *        description: Internal server error
 */
recipeRouter.get(
  '/trending',
  requestHandler(RecipeController.getTrendingRecipes),
);

/**
 * @openapi
 * /api/v1/recipes/search:
 *  get:
 *    tags:
 *      - Recipes
 *    description: Search for recipes
 *    parameters:
 *      - in: query
 *        name: query
 *        required: true
 *        schema:
 *          type: string
 *        description: The search query
 *        example: pasta
 *    responses:
 *      '200':
 *        description: Recipes retrieved successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */
recipeRouter.get('/search', requestHandler(RecipeController.searchRecipes));

/**
 * @openapi
 * /api/v1/recipes/{id}:
 *  get:
 *    tags:
 *      - Recipes
 *    description: Get a recipe by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of the recipe
 *        example: 123e4567-e89b-12d3-a456-426614174000
 *    responses:
 *      '200':
 *        description: Recipe retrieved successfully
 *      '404':
 *        description: Recipe not found
 *      '500':
 *        description: Internal server error
 */

recipeRouter.get('/:id', requestHandler(RecipeController.getRecipe));

/**
 * @openapi
 * /api/v1/recipes:
 *  put:
 *    tags:
 *      - Recipes
 *    description: Update one receipe
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of the recipe
 *        example: 123e4567-e89b-12d3-a456-426614174000
 *    responses:
 *      '200':
 *        description: Recipes updated successfully
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 *      '501':
 *        description: Not implemented (If no id is provided)
 */

recipeRouter.put(
  '/:id',
  upload.single('image'),
  validateRequest(CreateRecipeWithIdRequestSchema),
  processRecipeRequest,
  requestHandler(RecipeController.updateRecipe),
);

recipeRouter.put('/', requestHandler(RecipeController.updateAllRecipes));

/**
 * @openapi
 * /api/v1/recipes/{id}:
 *  delete:
 *    tags:
 *      - Recipes
 *    description: Delete a recipe by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of the recipe
 *        example: 123e4567-e89b-12d3-a456-426614174000
 *    responses:
 *      '200':
 *        description: Recipe deleted successfully
 *      '204':
 *        description: Recipe deleted successfully
 *      '404':
 *        description: Recipe not found
 *      '500':
 *        description: Internal server error
 */
recipeRouter.delete('/:id', requestHandler(RecipeController.deleteRecipe));

/**
 * @openapi
 * /api/v1/recipes:
 *  delete:
 *    tags:
 *      - Recipes
 *    description: Delete all recipes
 *    responses:
 *      '200':
 *        description: Recipes deleted successfully
 *      '204':
 *        description: Recipes deleted successfully
 *      '500':
 *        description: Internal server error
 */

recipeRouter.delete('/', requestHandler(RecipeController.deleteAllRecipes));
