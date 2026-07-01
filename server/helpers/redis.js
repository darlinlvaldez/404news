import getRedis from "../lib/redis.js";
import syncNewsViews from "../models/news/redis.js";
import syncCountryViews from "../models/news/country.js";

export default async function syncAllViews() {
  const redis = await getRedis();

  for await (const key of redis.scanIterator({
    MATCH: "news:views:*",
  })) {
    const slug = key.replace("news:views:", "");
    await syncNewsViews(slug);
  }

  for await (const key of redis.scanIterator({
    MATCH: "news:country:*",
  })) {
    await syncCountryViews(key);
  }
}