import db from "@/server/lib/db";
import ticketMessages from "@/server/models/admin/tickets/ticketMessages";
import {existsByTicket} from '@/server/services/admin/tickets/existsByTicket'

const ticketAdminModels = {};

ticketAdminModels.ticket = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT
      t.id,
      t.type,
      t.status,
      t.priority,
      t.subject,
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

ticketAdminModels.messages = async (id, limit = 5, beforeId = null) => {
  const params = [id];

  let query =
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
    INNER JOIN tickets t ON t.id = tm.ticket_id 

    WHERE tm.ticket_id = ?
    `
  ;

  if (beforeId) {
    query += ` AND tm.id < ? `;
    params.push(beforeId);
  }

  query += `
    ORDER BY tm.id DESC
    LIMIT ${Number(limit)}
  `;

  const [rows] = await db.execute(query, params);

  return rows.reverse();
};

ticketAdminModels.create = async ({
  ticketId,
  senderId,
  senderType,
  message,
  isInternal = false,
  attachments = [],
}) => {

  const ticket = await existsByTicket(ticketId);

  if (!ticket) {
    throw new Error("Ticket no encontrado");
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [insertResult] = await connection.execute(
      `
      INSERT INTO ticket_messages
        (ticket_id, sender_type, sender_id, message, is_internal)
      VALUES (?, ?, ?, ?, ?)
      `,
      [ticketId, senderType, senderId, message, isInternal ? 1 : 0]
    );

    const messageId = insertResult.insertId;

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

    const updateQuery = isInternal
      ? `
        UPDATE tickets
        SET last_message_id = ?, updated_at = NOW()
        WHERE id = ?
        `
      : `
        UPDATE tickets
        SET
          last_reply_at = NOW(),
          updated_at = NOW(),
          last_message_id = ?,
          unread_user_count = unread_user_count + 1
        WHERE id = ?
        `;

    const [updateResult] = await connection.execute(updateQuery, [messageId, ticketId]);

    if (updateResult.affectedRows === 0) {
      throw new Error("No se pudo actualizar el ticket");
    }

    await connection.commit();

    return await ticketMessages.findById(messageId);
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

ticketAdminModels.update = async (id, data) => {

  const fields = [];
  const values = [];

  const ticket = await ticketAdminModels.ticket(id);

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

export default ticketAdminModels;