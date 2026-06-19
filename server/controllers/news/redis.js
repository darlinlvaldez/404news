import getRedis from "../../lib/redis.js";

export default async function incrementView(slug, ip) {

  const redis = await getRedis();
  
  const viewKey = `news:viewed:${slug}:${ip}`;
  const counterKey = `news:views:${slug}`;

  const isNewView = await redis.set(viewKey, 1, {
    EX: 3600,
    NX: true
  });

  if (isNewView) {
    await redis.incr(counterKey);
  }
}