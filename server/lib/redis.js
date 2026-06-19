import { createClient } from "redis";
import config from "../../config.js";

let redis;

async function getRedis() {

  if (!redis) {

    redis = createClient({
      url: config.REDIS_URL,
    });

    redis.on("error", (err) => {
      console.error("Redis error:", err);
    });

    await redis.connect();
  }

  return redis;
}

export default getRedis;