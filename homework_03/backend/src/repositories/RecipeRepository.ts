import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { z } from 'zod';
import { CreateRecipeRequestSchema, Result } from '../utils';
import { TRecipe } from '../types';

export class RecipeRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor(
    prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  ) {
    this.prismaClient = prismaClient;
  }

  async create(authorId: string, recipe: TRecipe): Promise<Result<TRecipe>> {
    const result = await this.prismaClient.recipe.create({
      data: {
        authorId,
        ...recipe,
      },
    });

    return Result.ok(result, 'Recipe created successfully');
  }

  async createWithId(
    id: string,
    authorId: string,
    recipe: TRecipe,
  ): Promise<Result<TRecipe>> {
    const result = await this.prismaClient.recipe.findUnique({
      where: {
        id,
      },
    });

    if (result) {
      return Result.failWithStatusCode('Recipe already exists', 409);
    }

    const newRecipe = await this.prismaClient.recipe.create({
      data: {
        id,
        authorId,
        ...recipe,
      },
    });

    return Result.ok(newRecipe, 'Recipe created successfully');
  }

  async getAll(): Promise<Result<TRecipe[]>> {
    const result = await this.prismaClient.recipe.findMany();

    if (result.length === 0) {
      return Result.failWithStatusCode('No recipes found', 404);
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

    return Result.ok(result, 'Recipe retrieved successfully');
  }

  async update(
    id: string,
    authorId: string,
    recipe: TRecipe,
  ): Promise<Result<TRecipe>> {
    const result = await this.prismaClient.recipe.update({
      where: {
        id,
      },
      data: recipe,
    });

    if (!result) {
      return Result.failWithStatusCode('Recipe not found', 404);
    }

    return Result.ok(result, 'Recipe updated successfully');
  }

  async delete(id: string): Promise<Result<TRecipe>> {
    const result = await this.prismaClient.recipe.delete({
      where: {
        id,
      },
    });

    return Result.ok(result, 'Recipe deleted successfully');
  }

  async deleteAll(): Promise<Result<void>> {
    const result = await this.prismaClient.recipe.deleteMany();

    return Result.ok(undefined, 'Recipes deleted successfully');
  }
}
