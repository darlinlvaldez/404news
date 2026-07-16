import db from "@/server/lib/db";

const tickets= {};

tickets.getAll = async function (
  limit = 50,
  offset = 0,
  search = "",
  status = "",
  type = ""
) {
  let baseQuery = `
    FROM tickets t
    LEFT JOIN users u ON t.user_id = u.id
    WHERE 1=1
  `;

  const params = [];

  if (search) {
    baseQuery += `
      AND (
        t.subject LIKE ?
        OR t.id LIKE ?
        OR COALESCE(u.username, t.guest_name) LIKE ?
        OR COALESCE(u.email, t.guest_email) LIKE ?
      )
    `;

    params.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    );
  }

  if (status) {
    baseQuery += ` AND t.status = ?`;
    params.push(status);
  }

  if (type) {
    baseQuery += ` AND t.type = ?`;
    params.push(type);
  }

  const [countResult] = await db.query(
    `SELECT COUNT(*) AS total ${baseQuery}`,
    params
  );

  const total = countResult[0].total;

  const [rows] = await db.query(
    `
    SELECT
      t.id,
      t.type,
      t.subject,
      t.status,
      t.priority,
      COALESCE(u.username, t.guest_name) AS name,
      COALESCE(u.email, t.guest_email) AS email,
      t.created_at
    ${baseQuery}
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...params, Number(limit), Number(offset)]
  );

  return { rows, total };
};

export default tickets;