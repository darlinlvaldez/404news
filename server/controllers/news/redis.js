import getRedis from "../../lib/redis.js";
import getCountryByIP from "../../helpers/country.js";

export default async function incrementView(slug, ip, visitorId) {
  
  const redis = await getRedis();
  const viewKey = `news:viewed:${slug}:${visitorId}`;
  const counterKey = `news:views:${slug}`;

  if (!visitorId) {
    return;
  }

  const isNewView = await redis.set(viewKey, 1, {
    EX: 3600,
    NX: true
  });

  if (!isNewView) return;

  await redis.incr(counterKey);

  const country = await getCountryByIP(ip);

  if (!country) return;

  const countryKey = `news:country:${slug}:${country.code}`;

  const exists = await redis.exists(countryKey);

  if (!exists) {
    await redis.hSet(countryKey, {
      views: 1,
      name: country.name,
      created_at: new Date().toISOString()
    });
  } else {
    await redis.hIncrBy(countryKey, "views", 1);
  }
}