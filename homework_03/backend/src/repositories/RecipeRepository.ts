import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Result } from '../utils';
import { ICloudStorageService, TCreateRecipe, TRecipe } from '../types';

export class RecipeRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;
  private cloudStorageService: ICloudStorageService;

  constructor(
    prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    cloudStorageService: ICloudStorageService,
  ) {
    this.prismaClient = prismaClient;
    this.cloudStorageService = cloudStorageService;
  }

  async create(
    authorId: string,
    recipe: TCreateRecipe,
  ): Promise<Result<TRecipe>> {
    const { file, ...recipeProps } = recipe;

    const image = await this.cloudStorageService.uploadObject(file);

    const result = await this.prismaClient.recipe.create({
      data: {
        authorId,
        image,
        ...recipeProps,
      },
    });

    return Result.ok(result, 'Recipe created successfully');
  }

  async createWithId(
    id: string,
    authorId: string,
    recipe: TCreateRecipe,
  ): Promise<Result<TRecipe>> {
    const result = await this.prismaClient.recipe.findUnique({
      where: {
        id,
      },
    });

    if (result) {
      return Result.failWithStatusCode('Recipe already exists', 409);
    }

    const { file, ...recipeProps } = recipe;

    const image = await this.cloudStorageService.uploadObject(file);

    const newRecipe = await this.prismaClient.recipe.create({
      data: {
        id,
        authorId,
        image,
        ...recipeProps,
      },
    });

    return Result.ok(newRecipe, 'Recipe created successfully');
  }

  async getAll(): Promise<Result<TRecipe[]>> {
    const result = await this.prismaClient.recipe.findMany();

    if (result.length === 0) {
      return Result.failWithStatusCode('No recipes found', 404);
    }

    for (const recipe of result) {
      recipe.image = await this.cloudStorageService.getObject(recipe.image);
    }

    return Result.ok(result, 'Recipes retrieved successfully');
  }

  async getById(id: string): Promise<Result<TRecipe>> {
    const result = await this.prismaClient.recipe.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return Result.failWithStatusCode('Recipe not found', 404);
    }

    result.image = await this.cloudStorageService.getObject(result.image);

    return Result.ok(result, 'Recipe retrieved successfully');
  }

  async update(id: string, recipe: TCreateRecipe): Promise<Result<TRecipe>> {
    const existingRecipe = await this.prismaClient.recipe.findUnique({
      where: {
        id,
      },
    });

    if (!existingRecipe) {
      return Result.failWithStatusCode('Recipe not found', 404);
    }

    const { file, ...recipeProps } = recipe;

    await this.cloudStorageService.deleteObject(existingRecipe.image);

    const image = await this.cloudStorageService.uploadObject(file);

    const result = await this.prismaClient.recipe.update({
      where: {
        id,
      },
      data: {
        image,
        ...recipeProps,
      },
    });

    return Result.ok(result, 'Recipe updated successfully');
  }

  async delete(id: string): Promise<Result<null>> {
    const existingRecipe = await this.prismaClient.recipe.findUnique({
      where: {
        id,
      },
    });

    if (!existingRecipe) {
      return Result.failWithStatusCode('Recipe not found', 404);
    }

    await this.cloudStorageService.deleteObject(existingRecipe.image);

    await this.prismaClient.recipe.delete({
      where: {
        id,
      },
    });

    return Result.ok(null, 'Recipe deleted successfully');
  }

  async deleteAll(): Promise<Result<null>> {
    const recipes = await this.prismaClient.recipe.findMany();

    if (recipes.length === 0) {
      return Result.failWithStatusCode('No recipes found', 404);
    }

    for (const recipe of recipes) {
      await this.cloudStorageService.deleteObject(recipe.image);
    }

    const result = await this.prismaClient.recipe.deleteMany();

    return Result.ok(null, 'Recipes deleted successfully');
  }
}
