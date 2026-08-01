export async function existsByTicket(id, userId = null) {
  let query = `
    SELECT id, status
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

  return rows[0] ?? null;
}