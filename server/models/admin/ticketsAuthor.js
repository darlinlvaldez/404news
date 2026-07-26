import db from "@/server/lib/db";

const tickets= {};

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
    LEFT JOIN ticket_messages tm ON tm.id = t.last_message_id
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
      t.unread_admin_count,
      t.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR) AS is_new,
      tm.message AS last_message
    ${baseQuery}
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...params, Number(limit), Number(offset)]
  );

  return { rows, total };
};

tickets.createTicket = async ({
  userId,
  subject,
  message
}) => {

  const [result] = await db.execute(
    `
    INSERT INTO tickets
    (
      type,
      subject,
      message,
      status,
      user_id
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      "submission",
      subject,
      message,
      "open",
      userId
    ]
  );

  return result.insertId;
};

export default tickets;