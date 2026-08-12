import db from "@/server/lib/db.js";
import { getAuthorByUserId, getAuthorNewsById } from "@/server/services/catalog";

const news = {}; 

news.getAuthorNews = async function (
  userId,
  limit = 50,
  offset = 0,
  search = "",
  status = ""
) {

  let baseQuery = `
    FROM news n
    INNER JOIN authors a ON n.author_id = a.id
    LEFT JOIN categories c ON n.category_id = c.id
    WHERE a.user_id = ?
  `;

  const params = [userId];

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
      c.name AS category
    ${baseQuery}
    ORDER BY n.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...params, Number(limit), Number(offset)]
  );

  return { rows, total };
};

news.createNewsByAuthor = async (userId, newsData, blocks) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const author = await getAuthorByUserId(userId);

    if (!author) {
      throw new Error("AUTHOR NOT FOUND");
    }

    const [newsResult] = await connection.query(
      `INSERT INTO news
       (title, slug, excerpt, cover_image, author_id, category_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        newsData.title,
        newsData.slug,
        newsData.excerpt,
        newsData.cover_image,
        author.id,
        newsData.category_id,
        "draft"
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

news.updateNewsAuthor = async (userId, id, newsData, blocks) => {
  const connection = await db.getConnection();

  try {

    const news = await getAuthorNewsById(id, userId);

    if (!news) {
      throw new Error("Noticia no encontrada o no tienes permiso");
    }

    const newsId = news.id;

    await connection.beginTransaction();

    await connection.query(
      `UPDATE news SET
        title = ?,
        slug = ?,
        excerpt = ?,
        cover_image = ?,
        category_id = ?
       WHERE id = ?`,
      [
        newsData.title,
        newsData.slug,
        newsData.excerpt,
        newsData.cover_image,
        newsData.category_id,
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

news.getNewsById = async (userId, id) => {
  const [news] = await db.query(
    `
    SELECT n.*
    FROM news n
    INNER JOIN authors a ON n.author_id = a.id
    WHERE n.id = ?
      AND a.user_id = ?
    LIMIT 1
    `,
    [id, userId]
  );

  if (!news.length) {
    return {
      news: null,
      blocks: [],
    };
  }

  const [blocks] = await db.query(
    `
    SELECT *
    FROM news_blocks
    WHERE news_id = ?
    ORDER BY position ASC
    `,
    [id]
  );

  return {
    news: news[0],
    blocks,
  };
};

news.deleteNews = async (userId, id) => {
  const connection = await db.getConnection();

  try {
    const existing = await getAuthorNewsById(id, userId);

    if (!existing) {
      throw new Error("Noticia no encontrada o no tienes permiso");
    }

    const newsId = existing.id;

    await connection.beginTransaction();

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

export default news;