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

      COALESCE(a.name, u.name, u.username, t.guest_name) AS sender_name,
      COALESCE(assigned.name, assigned.username) AS assigned_name,

      a.avatar AS sender_avatar,

      u.email

    FROM tickets t

    LEFT JOIN authors a ON a.user_id = t.user_id
    LEFT JOIN users u ON t.user_id = u.id
    LEFT JOIN users assigned ON assigned.id = t.assigned_to

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
    u.role AS sender_role,

    COALESCE(a.name, u.name, u.username) AS sender_name,

    a.avatar AS sender_avatar,

    u.role AS sender_role

    FROM ticket_messages tm

    LEFT JOIN users u ON u.id = tm.sender_id

    LEFT JOIN authors a ON u.id = a.user_id

    WHERE tm.ticket_id = ?

    ORDER BY tm.id ASC`,
    [id]
  );

  return rows;
};

ticketModels.update = async (id, data) => {

  const fields = [];
  const values = [];

  const ticket = await ticketModels.ticket(id);

  if (data.status !== undefined) {
    if (data.status !== ticket.status) {
      fields.push("status = ?");
      values.push(data.status);

      if (data.status === "closed") {
        fields.push("closed_at = NOW()");
      } else if (ticket.status === "closed") {
        fields.push("closed_at = NULL");
      }
    }
  }

  if (data.priority !== undefined) {
    fields.push("priority = ?");
    values.push(data.priority);
  }

  if (fields.length === 0) return;

  values.push(id);

  await db.execute(
    `
    UPDATE tickets
    SET ${fields.join(", ")}
    WHERE id = ?
    `,
    values
  );
};

export default ticketModels;