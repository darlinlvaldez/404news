import db from "@/server/lib/db";

export async function findByUsername(username) {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ? AND role IN ('superadmin', 'admin', 'editor', 'support', 'author') LIMIT 1",
    [username]
  );

  return rows[0] || null;
}