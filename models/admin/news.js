import db from "@/lib/db.js";

const repository = {}; 

repository.getNewsTable = async function (
  limit = 50,
  offset = 0,
  search = "",
  status = ""
) {

  let baseQuery = `
    FROM news n
    LEFT JOIN authors a ON n.author_id = a.id
    LEFT JOIN categories c ON n.category_id = c.id
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
    `
    SELECT 
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

repository.createNews = async (newsData, blocks) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [newsResult] = await connection.query(
      `INSERT INTO news 
       (title, slug, excerpt, cover_image, author_id, category_id, status, views)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newsData.title,
        newsData.slug,
        newsData.excerpt,
        newsData.cover_image,
        newsData.author_id,
        newsData.category_id,
        newsData.status,
        newsData.views
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

repository.getAuthors = async function () {
  const [rows] = await db.query(
    `SELECT id, name FROM authors WHERE active = 1 ORDER BY name ASC`
  );
  return rows;
};

repository.getCategories = async function () {
  const [rows] = await db.query(
    `SELECT id, name FROM categories WHERE active = 1 ORDER BY name ASC`
  );
  return rows;
};

export default repository;