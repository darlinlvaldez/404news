import db from "@/server/lib/db";

const tickets= {};

tickets.getAll = async function (
  limit = 50,
  offset = 0,
  search = "",
  status = "",
  priority = "",
  type = ""
) {
  let baseQuery = `
    FROM tickets t
    LEFT JOIN users u ON t.user_id = u.id
    LEFT JOIN authors a ON a.user_id = u.id
    WHERE 1=1
  `;

  const params = [];

  if (search) {
    baseQuery += `
      AND (
        t.subject LIKE ?
        OR t.id LIKE ?
        OR COALESCE(a.name, u.username, t.guest_name) LIKE ?
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

  if (priority) {
    baseQuery += ` AND t.priority = ?`;
    params.push(priority);
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
      COALESCE(a.name, u.name, u.username, t.guest_name) AS name,
      COALESCE(u.email, t.guest_email) AS email,
      t.last_reply_at
    ${baseQuery}
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...params, Number(limit), Number(offset)]
  );

  return { rows, total };
};

tickets.getMinimum = async function (
  limit = 50,
  offset = 0,
  search = "",
  status = "",
  userId
) {
  let baseQuery = `
    FROM tickets t
    LEFT JOIN users u ON t.user_id = u.id
    LEFT JOIN authors a ON a.user_id = u.id
    WHERE t.user_id = ?
  `;

  const params = [userId];

  if (search) {
    baseQuery += `
      AND (
        t.subject LIKE ?
        OR t.id LIKE ?
      )
    `;

    params.push(
      `%${search}%`,
      `%${search}%`
    );
  }

  if (status) {
    baseQuery += ` AND t.status = ?`;
    params.push(status);
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
      t.subject,
      t.status,
      t.message,
      COALESCE(a.name, u.name, u.username) AS name,
      COALESCE(u.email, t.guest_email) AS email,
      t.last_reply_at,
      t.unread_user_count,
      t.unread_admin_count,

      (
        SELECT tm.message
        FROM ticket_messages tm
        WHERE tm.ticket_id = t.id
        ORDER BY tm.created_at DESC, tm.id DESC
        LIMIT 1
      ) AS last_message

    ${baseQuery}
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...params, Number(limit), Number(offset)]
  );

  return { rows, total };
};

export default tickets;