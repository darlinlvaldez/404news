import db from "@/server/lib/db";
import ticketMessages from "@/server/models/admin/tickets/ticketMessages";
import {existsByTicket} from '@/server/services/admin/tickets/existsByTicket'
import {resolveAttachments} from "@/server/services/admin/tickets/resolveAttachments";
import {addMessage} from "@/server/services/admin/tickets/addMessages";

const ticketAuthorModels = {};

ticketAuthorModels.ticket = async (id, userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      t.id,
      t.status,
      t.subject,
      t.user_id,
      t.assigned_to,
      t.last_reply_at,
      t.closed_at,
      t.created_at,
      t.updated_at,

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

ticketAuthorModels.messages = async (
  id,
  userId,
  limit = 5,
  beforeId = null,
) => {
  const params = [userId, id];

  let query = `
    SELECT
      tm.id,
      tm.sender_id,
      tm.message,
      tm.created_at,
      tm.author_read,
      a.avatar AS sender_avatar
    FROM ticket_messages tm
    LEFT JOIN users u ON u.id = tm.sender_id
    LEFT JOIN authors a ON u.id = a.user_id
    INNER JOIN tickets t ON t.id = tm.ticket_id AND t.user_id = ?
    WHERE tm.ticket_id = ? AND tm.is_internal = 0
  `;

  if (beforeId) {
    query += ` AND tm.id < ? `;
    params.push(beforeId);
  }

  query += `
    ORDER BY tm.id DESC
    LIMIT ${Number(limit)}
  `;

  const [rows] = await db.execute(query, params);
  const messages = rows.reverse();

  if (messages.length === 0) return messages;

  const attachmentsByMessage = await resolveAttachments(
    messages.map((m) => m.id),
  );

  return messages.map((m) => ({
    ...m,
    attachments: attachmentsByMessage[m.id] ?? [],
  }));
};

ticketAuthorModels.create = async ({
  ticketId,
  senderId,
  senderType,
  message,
  attachments = [],
}) => {

  const ticket = await existsByTicket(ticketId, senderId);

  if (!ticket) {
    throw new Error("No tienes permiso para responder este ticket");
  }

  if (ticket.status === "closed") {
    throw new Error("Este ticket ya fue cerrado");
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const messageId = await addMessage(connection, {
      ticketId,
      senderId,
      senderType,
      message,
      attachments,
    });

    const [updateResult] = await connection.execute(
      `
      UPDATE tickets
      SET
        last_reply_at = NOW(),
        updated_at = NOW(),
        last_message_id = ?,
        unread_admin_count = unread_admin_count + 1
      WHERE id = ?
      `,
      [messageId, ticketId]
    );

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

export default ticketAuthorModels;