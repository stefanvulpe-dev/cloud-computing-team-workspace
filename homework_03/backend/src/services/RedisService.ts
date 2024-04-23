import { createClient } from 'redis';

const redisConfig = {
  url: `rediss://${process.env.REDIS_HOST_NAME}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_ACCESS_KEY
};

export class RedisService {
  private static redisClient: any;

  private constructor() {}

  public static async getInstance() {
    if (!RedisService.redisClient) {
      RedisService.redisClient = createClient(redisConfig);
      RedisService.redisClient.on('error', (err: Error) =>
        console.error('ERR:REDIS:', err),
      );
      await RedisService.redisClient.connect();
    }
    return RedisService.redisClient;
  }
}
