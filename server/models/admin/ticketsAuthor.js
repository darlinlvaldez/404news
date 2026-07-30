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

const addMessage = async (connection, { ticketId, senderType, senderId, message, isInternal = false, attachments = [] }) => {
  const [messageResult] = await connection.execute(
    `
    INSERT INTO ticket_messages
      (ticket_id, sender_type, sender_id, message, is_internal)
    VALUES (?, ?, ?, ?, ?)
    `,
    [ticketId, senderType, senderId ?? null, message, isInternal]
  );

  const messageId = messageResult.insertId;

  if (attachments.length > 0) {
    const values = attachments.map((a) => [
      messageId,
      a.originalName,
      a.fileName,
      a.mimeType,
      a.fileSize,
      a.filePath,
    ]);

    await connection.query(
      `
      INSERT INTO ticket_attachments
        (message_id, original_name, file_name, mime_type, file_size, file_path)
      VALUES ?
      `,
      [values]
    );
  }

  return messageId;
};

tickets.createTicket = async ({
  userId,
  guestName,
  guestEmail,
  type = "submission",
  subject,
  message,
  senderType = "author",
  attachments = [],
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [ticketResult] = await connection.execute(
      `
      INSERT INTO tickets
        (type, subject, status, user_id, guest_name, guest_email)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [type, subject, "open", userId ?? null, guestName ?? null, guestEmail ?? null]
    );

    const ticketId = ticketResult.insertId;

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
      SET last_message_id = ?, unread_admin_count = unread_admin_count + 1
      WHERE id = ?
      `,
      [messageId, ticketId]
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