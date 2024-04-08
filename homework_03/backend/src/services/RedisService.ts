import { createClient } from "redis";

const redisConfig = {
    url: process.env.REDIS_URL,
}

export class RedisService {
    private static redisClient: any;

    private constructor() {}

    public static async getInstance() {
        if (!RedisService.redisClient) {
            RedisService.redisClient = createClient(redisConfig);
            RedisService.redisClient.on('error', (err: Error) => console.error('ERR:REDIS:', err));
            await RedisService.redisClient.connect();
        }
        return RedisService.redisClient;
    }
}
