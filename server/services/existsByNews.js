import db from "@/server/lib/db";

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