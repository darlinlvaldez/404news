import getRedis from "../lib/redis.js";
import syncNewsViews from "../models/news/redis.js";
import syncCountryViews from "../models/news/country.js";

export default async function syncAllViews() {
  const redis = await getRedis();

  for (const keys of redis.scanIterator({ MATCH: "news:views:*" })) {
    for (const key of keys) {
      try {
        const slug = key.replace("news:views:", "");
        await syncNewsViews(slug);
      } catch (error) {
        console.error("Error en views:", key, error);
      }
    }
  }

  for (const keys of redis.scanIterator({ MATCH: "news:country:*" })) {
    for (const key of keys) {
      try {
        await syncCountryViews(key);
      } catch (error) {
        console.error("Error en country:", key, error);
      }
    }
  }
}