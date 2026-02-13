import { createClient } from "redis";
import config from '../config.js';

let redis;

if (!global._redis) {
  global._redis = createClient({
    url: config.REDIS_URL,
  });

  global._redis.on("error", (err) => {
    console.error("Redis error:", err);
  });

  await global._redis.connect();
}

redis = global._redis;

export default redis;