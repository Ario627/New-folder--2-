import "server-only";
import Axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {Redis} from "@upstash/redis";

export const redis = Redis.fromEnv();

export async function GET() {
    const  cache = await redis.get("performance");
    if (cache) {
        return Response.json({source: "cache", data: cache})
    }

    const product = [
        {id: 1, name: "Product 1"},
        {id: 2, name: "Product 2"},
    ]
}