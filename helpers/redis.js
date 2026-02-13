import syncViewsToDatabase from "../models/news/redis"

async function syncAllViews() {
  const keys = await redis.keys("news:views:*");

  for (const key of keys) {
    const slug = key.replace("news:views:", "");
    await syncViewsToDatabase(slug);
  }
}