import db from "@/server/lib/db.js";

const news = {}; 

news.getNewsTable = async function (
  limit = 50,
  offset = 0,
  search = "",
  status = ""
) {

  let baseQuery = `
    FROM news n
    LEFT JOIN authors a ON n.author_id = a.id
    LEFT JOIN categories c ON n.category_id = c.id
    WHERE 1=1
  `;

  const params = [];

  if (search) {
    baseQuery += ` AND (n.title LIKE ? OR n.id LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }

  if (status) {
    baseQuery += ` AND n.status = ?`;
    params.push(status);
  }

  const [countResult] = await db.query(
    `SELECT COUNT(*) as total ${baseQuery}`,
    params
  );

  const total = countResult[0].total;

  const [rows] = await db.query(
    `SELECT 
      n.id,
      n.title,
      n.slug,
      n.status,
      n.views,
      n.created_at,
      a.name AS author,
      c.name AS category
    ${baseQuery}
    ORDER BY n.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...params, Number(limit), Number(offset)]
  );

  return { rows, total };
};

news.createNews = async (newsData, blocks) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [newsResult] = await connection.query(
      `INSERT INTO news 
       (title, slug, excerpt, cover_image, author_id, category_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        newsData.title,
        newsData.slug,
        newsData.excerpt,
        newsData.cover_image,
        newsData.author_id,
        newsData.category_id,
        newsData.status,
      ]
    );

    const newsId = newsResult.insertId;

    for (const block of blocks) {
      await connection.query(
        `INSERT INTO news_blocks 
         (news_id, block_type, content, image_url, alt_text, position)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          newsId,
          block.block_type,
          block.content || null,
          block.image_url || null,
          block.alt_text || null,
          block.position
        ]
      );
    }

    await connection.commit();

    return newsId;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

news.updateNews = async (id, newsData, blocks) => {
  const connection = await db.getConnection();

  try {

    const [news] = await connection.query(
        `SELECT id FROM news WHERE id = ?`,
        [id]
    );

    if (!news.length) {
        throw new Error("Noticia no encontrada");
    }

    const newsId = news[0].id;

    await connection.beginTransaction();

    await connection.query(
      `UPDATE news SET
        title = ?,
        slug = ?,
        excerpt = ?,
        cover_image = ?,
        author_id = ?,
        category_id = ?,
        status = ?
       WHERE id = ?`,
      [
        newsData.title,
        newsData.slug,
        newsData.excerpt,
        newsData.cover_image,
        newsData.author_id,
        newsData.category_id,
        newsData.status,
        id
      ]
    );

    await connection.query(
      `DELETE FROM news_blocks WHERE news_id = ?`,
      [newsId]
    );

    for (const block of blocks) {
      await connection.query(
        `INSERT INTO news_blocks
         (news_id, block_type, content, image_url, alt_text, position)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          newsId,
          block.block_type,
          block.content,
          block.image_url,
          block.alt_text,
          block.position
        ]
      );
    }

    await connection.commit();

    return newsId;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

news.getNewsById = async (id) => {

  const [news] = await db.query(
    `SELECT * FROM news WHERE id = ?`,
    [id]
  );

  if (!news.length) {
    return { news: null, blocks: [] };
  }

  const newsId = news[0].id;

  const [blocks] = await db.query(
    `SELECT * FROM news_blocks
     WHERE news_id = ?
     ORDER BY position ASC`,
    [newsId]
  );

  return {
    news: news[0],
    blocks
  };
};

news.deleteNews = async (id) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [existing] = await connection.query(
      `SELECT id FROM news WHERE id = ?`,
      [id]
    );

    const newsId = existing[0].id;

    if (existing.length === 0) {
      throw new Error("Noticia no encontrada");
    }

    await connection.query(
      `DELETE FROM news_blocks WHERE news_id = ?`,
      [newsId]
    );

    await connection.query(
      `DELETE FROM news WHERE id = ?`,
      [id]
    );

    await connection.commit();

    return true;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

news.getAuthors = async function () {
  const [rows] = await db.query(`
    SELECT
      a.id,
      a.name
    FROM authors a
    JOIN users u ON a.user_id = u.id
    WHERE u.active = 1
    ORDER BY a.name ASC
  `);

  return rows;
};

news.getCategories = async function () {
  const [rows] = await db.query(
    `SELECT id, name FROM categories WHERE active = 1 ORDER BY name ASC`
  );
  return rows;
};

export default news;