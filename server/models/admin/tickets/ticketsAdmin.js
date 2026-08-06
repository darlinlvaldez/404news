import db from "@/server/lib/db";
import {addMessage} from '@/server/services/admin/tickets/addMessages'

const tickets = {};

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
    LEFT JOIN ticket_messages tm ON tm.id = t.last_message_id
    LEFT JOIN ticket_categories tc ON tc.id = t.category_id
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
      t.ticket_number,
      t.type,
      t.subject,
      t.status,
      t.priority,
      COALESCE(a.name, u.name, u.username, t.guest_name) AS name,
      COALESCE(u.email, t.guest_email) AS email,
      t.last_reply_at,
      t.unread_admin_count,
      t.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR) AS is_new,
      tc.name AS category,
      tm.message AS last_message,
      tm.is_internal
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
  senderId,     
  type = "submission",
  subject,
  message,
  priority = "medium",
  categoryId,
  attachments = [],
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [ticketResult] = await connection.execute(
      `
      INSERT INTO tickets
        (type, subject, status, priority, category_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [type, subject, "open", priority, categoryId, userId]
    );

    const ticketId = ticketResult.insertId;

    const ticketNumber = `TCK-${String(ticketId).padStart(6, "0")}`;

    const messageId = await addMessage(connection, {
      ticketId,
      senderType: "admin",
      senderId,
      message,
      attachments,
    });

    await connection.execute(
      `
      UPDATE tickets
      SET last_message_id = ?, 
      ticket_number = ?,
      unread_admin_count = unread_admin_count + 1
      WHERE id = ?
      `,
      [messageId, ticketNumber, ticketId]
    );

    await connection.commit();

    return { ticketId, messageId };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

export default tickets;