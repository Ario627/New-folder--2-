import {redis} from './redis';

type cacheOptions = {
    ttl?: number;
    revalidate?: number;
}

export async function fetchWithRedisCache<T> (
    key: string,
    fetcher: () => Promise<T>,
    options: cacheOptions = {ttl: 60 * 60}
): Promise<T> {
    const cached = await redis.get<T>(key);
    if(cached) {
        console.log(`Cache hit: `, `${key}`);
        return cached;
    }

    console.log(`Cache MISS: ${key} → fetching...`);
    const data = await fetcher();

    if(options.ttl) {
        await redis.set(key, data, {ex: options.ttl});
    } else {
        await redis.set(key, data);
    }
    return data;
}