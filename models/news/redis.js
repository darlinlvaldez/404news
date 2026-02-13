import db from "../../lib/db"
import redis from "../../lib/redis";

export default async function syncViewsToDatabase(slug) {

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