import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { z } from 'zod';
import { OpenAIService } from '../services';
import { AssistantRequestSchema } from '../utils';

export async function GetAssistantResponse(
  req: z.infer<typeof AssistantRequestSchema>,
  res: ExpressResponse,
) {
  const response = await OpenAIService.getAssistantResponse(req.body.message);

  return res.status(200).json(response);
}

export async function GetTestResponse(
  _req: ExpressRequest,
  res: ExpressResponse,
) {
  const response = await OpenAIService.getTestResponse();

  return res.status(200).json(response);
}
