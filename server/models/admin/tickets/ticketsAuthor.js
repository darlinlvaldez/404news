import db from "@/server/lib/db";
import {addMessage} from '@/server/services/admin/tickets/addMessages'

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
    LEFT JOIN ticket_categories tc ON tc.id = t.category_id
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
      t.ticket_number,
      t.subject,
      t.status,
      t.last_reply_at,
      t.unread_user_count,
      t.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR) AS is_new,
      tm.message AS last_message,
      tc.name AS category
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
  guestName,
  guestEmail,
  type = "submission",
  subject,
  message,
  categoryId,
  senderType = "author",
  attachments = [],
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [ticketResult] = await connection.execute(
      `
      INSERT INTO tickets
        (type, subject, status, user_id, category_id, guest_name, guest_email)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [type, subject, "open", categoryId, userId ?? null, guestName ?? null, guestEmail ?? null]
    );

    const ticketId = ticketResult.insertId;

    const ticketNumber = `TCK-${String(ticketId).padStart(6, "0")}`;

    const messageId = await addMessage(connection, {
      ticketId,
      senderType,
      senderId: userId,
      message,
      attachments,
    });

    await connection.execute(
      `
      UPDATE tickets
      SET last_message_id = ?, unread_user_count = unread_user_count + 1
      WHERE id = ?
      `,
      [messageId, ticketId, ticketNumber]
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