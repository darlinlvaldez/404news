import db from "@/server/lib/db";

export async function existsByTicket(id, userId = null) {
  let query = `
    SELECT id
    FROM tickets
    WHERE id = ?
  `;

  const params = [id];

  if (userId !== null) {
    query += " AND user_id = ?";
    params.push(userId);
  }

  query += " LIMIT 1";

  const [rows] = await db.execute(query, params);

  return rows.length > 0;
}

export async function existsByNews(title, slug) {
  const [rows] = await db.query(
    `
    SELECT id 
    FROM news 
    WHERE title = ? OR slug = ?
    LIMIT 1
    `,
    [title, slug]
  );

  return rows.length > 0;
}