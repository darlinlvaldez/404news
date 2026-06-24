import getRedis from "../lib/redis.js";
import syncNewsViews from "../models/news/redis.js";
import syncCountryViews from "../models/news/country.js";

export default async function syncAllViews() {
  const redis = await getRedis();
  const viewKeys = await redis.keys("news:views:*");

  for (const key of viewKeys) {
    const slug = key.replace("news:views:", "");
    await syncNewsViews(slug);
  }

  const countryKeys = await redis.keys("news:country:*");

  for (const key of countryKeys) {
    await syncCountryViews(key);
  }
}