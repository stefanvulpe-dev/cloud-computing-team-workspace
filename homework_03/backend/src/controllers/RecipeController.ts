import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { z } from 'zod';
import {
  CreateRecipeRequestSchema,
  CreateRecipeWithIdRequestSchema,
  GetRecipeAudioRequestSchema,
  logger,
  Result,
} from '../utils';
import { RecipeRepository } from '../repositories';
import { prisma } from '../prisma';
import { TextToSpeechService, cloudStorageService } from '../services';
import * as fs from 'node:fs';

export async function createRecipe(
  req: z.infer<typeof CreateRecipeRequestSchema>,
  res: ExpressResponse,
) {
  const repository = new RecipeRepository(prisma, cloudStorageService);

  const file = req.file as unknown as Express.Multer.File;

  const result = await repository.create(req.user.id, { file, ...req.body });

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.status(201).json(result);
}

export async function createRecipeWithId(
  req: z.infer<typeof CreateRecipeWithIdRequestSchema>,
  res: ExpressResponse,
) {
  const repository = new RecipeRepository(prisma, cloudStorageService);

  const file = req.file as unknown as Express.Multer.File;

  const result = await repository.createWithId(req.params.id, req.user.id, {
    file,
    ...req.body,
  });

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.status(201).json(result);
}

export async function getRecipes(_req: ExpressRequest, res: ExpressResponse) {
  const repository = new RecipeRepository(prisma, cloudStorageService);
  const result = await repository.getAll();

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.status(200).json(result);
}

export async function getRecipe(req: ExpressRequest, res: ExpressResponse) {
  const repository = new RecipeRepository(prisma, cloudStorageService);
  const result = await repository.getById(req.params.id);

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.status(200).json(result);
}

export async function updateRecipe(
  req: z.infer<typeof CreateRecipeWithIdRequestSchema>,
  res: ExpressResponse,
) {
  if (!req.user) {
    return res.status(401).json(Result.failWithMessage('Unauthorized'));
  }

  if (!req.params) {
    return res.status(400).json(Result.failWithMessage('Bad request'));
  }

  const repository = new RecipeRepository(prisma, cloudStorageService);

  const file = req.file as unknown as Express.Multer.File;

  const result = await repository.update(req.params.id, {
    file,
    ...req.body,
  });

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.status(200).json(result);
}

export async function updateAllRecipes(
  req: ExpressRequest,
  res: ExpressResponse,
) {
  return res.status(501).json(Result.failWithMessage('Not implemented'));
}

export async function deleteRecipe(req: ExpressRequest, res: ExpressResponse) {
  if (!req.params) {
    return res.status(400).json(Result.failWithMessage('Bad request'));
  }

  const repository = new RecipeRepository(prisma, cloudStorageService);
  const result = await repository.delete(req.params.id);

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.sendStatus(204);
}

export async function deleteAllRecipes(
  _req: ExpressRequest,
  res: ExpressResponse,
) {
  const repository = new RecipeRepository(prisma, cloudStorageService);
  const result = await repository.deleteAll();

  if (!result.isSuccess) {
    return res.status(result.statusCode).json(result);
  }

  return res.sendStatus(204);
}

export async function getTrendingRecipes(
  _req: ExpressRequest,
  res: ExpressResponse,
) {
  const result = await fetch(`${process.env.RECIPES_API_URL}/random?number=6`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.RECIPES_API_KEY!,
    },
  });

  const data = await result.json();

  return res.status(200).json(data);
}

export async function searchRecipes(req: ExpressRequest, res: ExpressResponse) {
  if (!req.query.title) {
    return res.status(400).json(Result.failWithMessage('Bad request'));
  }

  const result = await fetch(
    `${process.env.RECIPES_API_URL}/complexSearch?titleMatch=${req.query.title}&addRecipeInformation=true&fillIngredients=true`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.RECIPES_API_KEY!,
      },
    },
  );

  const data = await result.json();

  return res.status(200).json(data);
}

export async function getRecipeAudio(
  req: z.infer<typeof GetRecipeAudioRequestSchema>,
  res: ExpressResponse,
) {
  const { audioContent, response } = await TextToSpeechService.synthesizeText(
    req.body.text,
  );

  if (!audioContent) {
    return res
      .status(500)
      .json(Result.failWithMessage('Failed to synthesize text'));
  }

  return res.status(200).json({
    audioContent: audioContent.toString('base64'),
  });
}
