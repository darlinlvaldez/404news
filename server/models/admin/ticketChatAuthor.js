import db from "@/server/lib/db";

const ticketAuthorModels = {};

ticketAuthorModels.ticket = async (id, userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      t.id,
      t.status,
      t.subject,
      t.message,
      t.user_id,
      t.assigned_to,
      t.last_reply_at,
      t.closed_at,
      t.created_at,
      t.updated_at,

      COALESCE(a.name, u.name, u.username) AS sender_name,
      COALESCE(assigned.name, assigned.username) AS assigned_name,

      a.avatar AS sender_avatar,

      u.email

    FROM tickets t

    LEFT JOIN authors a ON a.user_id = t.user_id
    LEFT JOIN users u ON t.user_id = u.id
    LEFT JOIN users assigned ON assigned.id = t.assigned_to

    WHERE t.id = ?
    AND t.user_id = ?
    LIMIT 1
    `,
    [id, userId],
  );

  return rows[0] ?? null;
};

ticketAuthorModels.messages = async (id, userId) => {
  const [rows] = await db.execute(
    `
    SELECT
    tm.id,
    tm.sender_id,
    tm.message,
    tm.created_at,
    u.role AS sender_role,

    COALESCE(a.name, u.name, u.username) AS sender_name,

    a.avatar AS sender_avatar,

    u.role AS sender_role

    FROM ticket_messages tm

    LEFT JOIN users u ON u.id = tm.sender_id

    LEFT JOIN authors a ON u.id = a.user_id

    INNER JOIN tickets t ON t.id = tm.ticket_id AND t.user_id = ?

    WHERE tm.ticket_id = ?

    ORDER BY tm.id ASC`,
    [id, userId],
  );

  return rows;
};

ticketAuthorModels.create = async ({
  ticketId,
  senderId,
  senderType,
  message,
}) => {
  const [ticket] = await db.execute(
    `
    SELECT id
    FROM tickets
    WHERE id = ?
    AND user_id = ?
    `,
    [ticketId, senderId],
  );

  if (ticket.length === 0) {
    throw new Error("No tienes permiso para responder este ticket");
  }

  await db.execute(
    `
      INSERT INTO ticket_messages
      (
        ticket_id,
        sender_type,
        sender_id,
        message,
      )
      VALUES (?, ?, ?, ?)
  `,
    [ticketId, senderType, senderId, message],
  );

  await db.execute(
    `
    UPDATE tickets
    SET
      last_reply_at = NOW(),
      updated_at = NOW()
    WHERE id = ?
    `,
    [ticketId],
  );

  return await ticketAuthorModels.messages(ticketId);
};

export default ticketAuthorModels;
