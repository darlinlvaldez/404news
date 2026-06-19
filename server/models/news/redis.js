import db from "../../lib/db.js"
import getRedis from "../../lib/redis.js";

export default async function syncViewsToDatabase(slug) {

  const redis = await getRedis();

  const counterKey = `news:views:${slug}`;

  const views = await redis.get(counterKey);

  if (!views) return;
  
  await db.query(`
    UPDATE news
    SET views = views + ?
    WHERE slug = ?`,
    [Number(views), slug]
  );

  await redis.del(counterKey);
}