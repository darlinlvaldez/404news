import db from "@/server/lib/db";

export async function exists (id) {
  const [rows] = await db.execute(
    `
    SELECT id
    FROM tickets
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows.length > 0;
};