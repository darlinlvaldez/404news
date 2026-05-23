import db from "../../lib/db";

const getNews = {};

getNews.getNewsSearch = async function (term, page = 1, limit = 9) {
  return getNews.getPaginatedNews({
    whereClause: "AND (title LIKE ? OR excerpt LIKE ?)",
    params: [`%${term}%`, `%${term}%`],
    page,
    limit
  });
};

getNews.getPaginatedNews = async function ({ whereClause, params = [], page = 1, limit = 9 }) {
  const offset = (page - 1) * limit;

  const [countRows] = await db.query(`
    SELECT COUNT(*) as total
    FROM news
    WHERE status = 'published'
      ${whereClause}
  `, params);

  const total = countRows[0].total;

  const [rows] = await db.query(`
    SELECT id, title, slug, excerpt, cover_image, created_at
    FROM news
    WHERE status = 'published'
      ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `, [...params, limit, offset]);

  return { results: rows, total, limit };
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
    WHERE n.status = 'published'
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
    WHERE n.status = 'published'
    AND n.created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)
    AND n.created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)
    ORDER BY n.created_at DESC
    LIMIT ?
  `, [limit])

  return rows
}

getNews.getTrendingNews = async function(limit) {
  const [rows] = await db.query(`
    SELECT 
      n.id,
      n.title,
      n.slug,
      n.excerpt,
      n.cover_image,
      n.created_at,
      n.views
    FROM news n
    WHERE n.status = 'published'
      AND n.created_at >= DATE_SUB(NOW(), INTERVAL 3 DAY)
    ORDER BY n.views DESC
    LIMIT ?
  `, [limit])

  return rows
}

getNews.getByCategorySlug = async function (slug, excludeIds = []) {

  const placeholders = excludeIds.length
    ? `AND n.id NOT IN (${excludeIds.map(() => '?').join(',')})`
    : '';

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
    WHERE c.slug = ?
      AND n.status = 'published'
      AND c.active = 1
      ${placeholders}
    ORDER BY n.created_at DESC
  `, [slug, ...excludeIds]);

  return rows;
};

getNews.getMostReadByCategory = async function (slug, limit) {

  const [rows] = await db.query(`
    SELECT 
      n.id,
      n.title,
      n.slug,
      n.excerpt,
      n.cover_image,
      n.created_at,
      n.views
    FROM news n
    JOIN categories c ON n.category_id = c.id
    WHERE c.slug = ?
      AND n.views > 0
      AND n.status = 'published'
      AND c.active = 1
      ORDER BY n.views / (DATEDIFF(NOW(), n.created_at) + 1) DESC
    LIMIT ?
  `, [slug, limit]);

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
    WHERE n.slug = ? AND n.status = 'published'
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
  { excludeId = null, limit = 8 } = {}
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

getNews.getNewsAuthor = async function (slug, page = 1, limit = 9) {

  const [authorRows] = await db.query(`
    SELECT id, name, bio, slug, avatar
    FROM authors
    WHERE slug = ? 
  `, [slug]);

  if (!authorRows.length) return null;

  const author = authorRows[0];

  const paginated = await getNews.getPaginatedNews({
    whereClause: "AND author_id = ?",
    params: [author.id],
    page,
    limit
  });

  return {
    author,
    news: paginated.results,
    total: paginated.total,
    limit
  };
};

export default getNews;