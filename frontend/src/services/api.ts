import "server-only"

import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {Redis} from "@upstash/redis";
import type { ErineProfie, GalleryImage, Schedule } from "@/types";

export interface MessagePayload {
    name: string;
    message: string;
}

export interface MessageRecord extends MessagePayload {
    _id: string;
    date: string;
}

export type RequestOptions = {
cacheKey: string;
cacheTag: string;
revalidate?: number;
signal?: AbortSignal;
skipCache?: boolean;
}

type EventsDTO = {
    _id?: string;
    id?: string;
    title: string;
    description?: string;
    date: string;
    location?: string;
    startTime?: string;
    endTime?: string;
    imageUrl?: string;
}

const DEFAULT_CACHE_TTL = 30_000;
const JSON_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
const CACHE_NAMESPACE = "erine:cache";
const TAG_NAMESPACE = "erine:tag";
const TAG_REGISTRY_KEY = `${TAG_NAMESPACE}`;
const TAG_TTL_BUFFER_SECONDS = 5;

const sharedRedis = (() => {
    try {
        return Redis.fromEnv();
    } catch (err) {
        throw new Error (
            "Upstash Redis is not properly configured. Please set the UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.",
            {cause: err as Error}
        )
    }
})