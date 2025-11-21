import {Redis} from '@upstash/redis';

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function testRedis() {
    await redis.set("test", "hello from redis");
    const val = await redis.get("test");
    console.log("Redis test message:", val);
}