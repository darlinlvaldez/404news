import db from "../../lib/db";

const getNews = {};

getNews.getNewsSearch = async function (term) {
  const [rows] = await db.query(`
    SELECT 
      id,
      title,
      slug,
      excerpt,
      cover_image,
      created_at
    FROM news
    WHERE status = 'published' AND active = 1
      AND (title LIKE ? OR excerpt LIKE ? )
    ORDER BY created_at DESC
  `, [`%${term}%`, `%${term}%`]);

  return rows;
}

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

getNews.getDetailsNews = async function (slug) {
  const [[news]] = await db.query(`
    SELECT 
      n.id,
      c.id AS categoryId,
      a.name AS author,
      a.slug AS author_slug,
      n.title,
      n.slug,
      n.excerpt,
      n.cover_image,
      n.created_at
    FROM news n
    JOIN authors a ON n.author_id = a.id
    JOIN categories c ON n.category_id = c.id
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

getNews.getRelatedNews = async function (categoryId,
  { excludeId = null, limit = 4 } = {}
) {
  let query = `
    SELECT 
      n.id,
      n.title,
      n.slug,
      n.excerpt,
      n.cover_image,
      n.created_at
    FROM news n
    WHERE n.category_id = ?
      AND n.status = 'published'
      AND n.active = 1
  `;

  const params = [categoryId];

  if (excludeId) {
    query += ` AND n.id != ?`;
    params.push(excludeId);
  }

  query += ` ORDER BY n.created_at DESC`;

  if (limit) {
    query += ` LIMIT ?`;
    params.push(limit);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

getNews.getNewsAuthor = async function (slug) {
  const [rows] = await db.query(`
    SELECT 
      a.id AS author_id,
      a.name,
      a.bio,
      a.slug AS author_slug,
      a.avatar,
      a.active AS author_active,
      n.id AS news_id,
      n.title,
      n.slug AS news_slug,
      n.excerpt,
      n.cover_image,
      n.status,
      n.created_at,
      n.active AS news_active
    FROM authors a
    LEFT JOIN news n ON n.author_id = a.id
      AND n.status = 'published'
      AND n.active = 1
    WHERE a.slug = ? AND a.active = 1

    ORDER BY n.created_at DESC
  `, [slug]);

  return rows;
};

export default getNews;