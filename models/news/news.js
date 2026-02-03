import db from "../../lib/db";

const getNews = {};

getNews.getLatestNews = async function (limit = 10) {
  const [rows] = await db.query(`
    SELECT 
      n.id,
      n.title,
      n.slug,
      n.excerpt,
      n.cover_image,
      n.created_at
    FROM news n
    WHERE n.status = 'published' AND n.active = 1
    ORDER BY n.created_at DESC
    LIMIT ?
  `, [limit]);

  return rows;
}

getNews.getLastWeekNews = async function(limit = 3) {
  const [rows] = await db.query(`
    SELECT 
      n.id,
      n.title,
      n.slug,
      n.cover_image,
      n.created_at
    FROM news n
    WHERE n.status = 'published'
      AND n.active = 1
      AND n.created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)
      AND n.created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)
    ORDER BY n.created_at DESC
    LIMIT ?
  `, [limit])

  return rows
}

export default getNews;