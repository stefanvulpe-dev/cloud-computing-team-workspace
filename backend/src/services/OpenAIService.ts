import OpenAI from 'openai';
import { Result } from '../utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getTestResponse() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
    temperature: 1,
    max_tokens: 100,
  });

  return Result.ok(
    {
      message: chatCompletion.choices[0].message.content,
      usage: chatCompletion.usage,
    },
    'Test assistant response',
  );
}

export async function getAssistantResponse(message: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 1000,
  });

  return Result.ok(
    {
      message: chatCompletion.choices[0].message.content,
      usage: chatCompletion.usage,
    },
    'Assistant response',
  );
}
