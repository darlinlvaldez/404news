import db from "@/server/lib/db";

const ticketModels = {};

ticketModels.ticket = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT
      t.id,
      t.type,
      t.status,
      t.priority,
      t.subject,
      t.message,
      t.user_id,
      t.guest_name,
      t.guest_email,
      t.assigned_to,
      t.last_reply_at,
      t.closed_at,
      t.created_at,
      t.updated_at,

      a.name AS sender_name,
      a.avatar AS sender_avatar,

      u.email

    FROM tickets t

    LEFT JOIN authors a ON a.user_id = t.user_id
    LEFT JOIN users u ON t.user_id = u.id

    WHERE t.id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] ?? null;
};

ticketModels.messages = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT
    tm.id,
    tm.sender_type,
    tm.sender_id,
    tm.message,
    tm.is_internal,
    tm.created_at,

    a.name AS sender_name,
    a.avatar AS sender_avatar,

    u.role AS sender_role

    FROM ticket_messages tm

    LEFT JOIN users u ON u.id = tm.sender_id

    LEFT JOIN authors a ON a.user_id = u.id

    WHERE tm.ticket_id = ?

    ORDER BY tm.created_at ASC`,
    [id]
  );

  return rows;
};

export default ticketModels;