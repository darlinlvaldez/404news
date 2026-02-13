import redis from "@/lib/redis";

export default async function incrementViewRedis(slug, ip) {

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