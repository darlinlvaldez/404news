import db from "@/server/lib/db";

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
      t.last_reply_at,
      t.unread_user_count,
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
  senderId,     
  type = "submission",
  subject,
  message,
  priority = "medium",
  attachments = [],
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [ticketResult] = await connection.execute(
      `
      INSERT INTO tickets
        (type, subject, status, priority, user_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [type, subject, "open", priority, userId]
    );

    const ticketId = ticketResult.insertId;

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
      SET last_message_id = ?, unread_user_count = unread_user_count + 1
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

tickets.getAuthorsForSelect = async () => {
  const [rows] = await db.execute(
    `
    SELECT
      u.id AS user_id,
      a.name,
      a.avatar
    FROM authors a
    INNER JOIN users u ON u.id = a.user_id
    WHERE u.active = 1
    ORDER BY a.name ASC
    `
  );

  return rows;
};

export default tickets;