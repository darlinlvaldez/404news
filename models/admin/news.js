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
    WHERE n.active = 1
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

export default repository;