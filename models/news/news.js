import db from "../../lib/db";

const getNews = {};

getNews.getLatestNews = async function (limit, offset = 0) {
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
    LIMIT ? OFFSET ?
  `, [limit, offset])

  return rows
}

getNews.getLastWeekNews = async function(limit) {
  const [rows] = await db.query(`
    SELECT 
      n.id,
      n.title,
      n.slug,
      n.cover_image,
      n.created_at
    FROM news n
    WHERE n.status = 'published' AND n.active = 1
    AND n.created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)
    AND n.created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)
    ORDER BY n.created_at DESC
    LIMIT ?
  `, [limit])

  return rows
}

getNews.getByCategorySlug = async function (slug) {
  const [rows] = await db.query(`
    SELECT 
      n.id,
      n.title,
      n.slug,
      n.excerpt,
      n.cover_image,
      n.created_at,
      c.name AS category
    FROM news n
    JOIN categories c ON n.category_id = c.id
    WHERE c.slug = ? AND n.status = 'published'
      AND n.active = 1 AND c.active = 1
    ORDER BY n.created_at DESC
  `, [slug]);

  return rows;
};

getNews.getDetailNews = async function (slug) {
  const [[news]] = await db.query(`
    SELECT 
      n.id,
      a.name AS author,
      n.title,
      n.slug,
      n.excerpt,
      n.cover_image,
      n.created_at
    FROM news n
    JOIN authors a ON n.author_id = a.id
    WHERE n.slug = ? AND n.status = 'published' AND n.active = 1
    LIMIT 1
    `,
    [slug]
  );

  if (!news) return null;

  const [blocks] = await db.query(`
    SELECT 
    id,
    block_type,
    content,
    image_url,
    alt_text,
    position
    FROM news_blocks
    WHERE news_id = ?
    ORDER BY position ASC
    `,
    [news.id]
  );

  news.blocks = blocks;

  return news;
};

export default getNews;