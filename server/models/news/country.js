import db from "../../lib/db.js";
import getRedis from "../../lib/redis.js";

export default async function syncCountryViews(key) {
  const redis = await getRedis();
  const data = await redis.hGetAll(key);

  if (!data.views) return;

  const views = Number(data.views);
  const countryName = data.name;

  if (!views) return;

  const parts = key.split(":");
  const slug = parts[2];
  const countryCode = parts[3];

  const [news] = await db.query(
    `
    SELECT id 
    FROM news
    WHERE slug = ?
    `,
    [slug],
  );

  if (!news.length) return;

  const newsId = news[0].id;

  const createdAt = data.created_at || new Date();

  await db.query(
    `
        INSERT INTO country_stats
        (
          news_id,
          country_code,
          country_name,
          views,
          created_at
        )

        VALUES(?,?,?,?,?)
        `,
    [newsId, countryCode, countryName, Number(views), createdAt],
  );

  await redis.del(key);
}