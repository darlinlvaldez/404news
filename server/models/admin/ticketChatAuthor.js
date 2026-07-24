import db from "@/server/lib/db";
import ticketMessages from "@/server/models/admin/ticketMessages";
import {exists} from '@/server/models/admin/ticketExist'

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

ticketAuthorModels.messages = async (id, userId, limit = 5, beforeId = null) => {

  const params = [userId, id];

  let query = `
    SELECT
      tm.id,
      tm.sender_id,
      tm.message,
      tm.created_at,
      u.role AS sender_role,
      COALESCE(a.name, u.name, u.username) AS sender_name,
      a.avatar AS sender_avatar

    FROM ticket_messages tm

    LEFT JOIN users u ON u.id = tm.sender_id
    LEFT JOIN authors a ON u.id = a.user_id

    INNER JOIN tickets t 
      ON t.id = tm.ticket_id 
      AND t.user_id = ?

    WHERE tm.ticket_id = ?
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

  return rows.reverse();
};

ticketAuthorModels.create = async ({
  ticketId,
  senderId,
  senderType,
  message,
}) => {
  
  const ticket = await exists(ticketId, senderId);

  if (!ticket) {
    throw new Error("No tienes permiso para responder este ticket");
  }
  
  const [insertResult] = await db.execute(
    `
    INSERT INTO ticket_messages
    (
      ticket_id,
      sender_type,
      sender_id,
      message
    )
    VALUES (?, ?, ?, ?)
  `,
    [ticketId, senderType, senderId, message],
  );

  const [updateResult] = await db.execute(
    `
    UPDATE tickets
    SET
      last_reply_at = NOW(),
      updated_at = NOW(),
      unread_user_count = unread_user_count + 1
    WHERE id = ?
    `,
    [ticketId],
  );

  if (updateResult.affectedRows === 0) {
    throw new Error("No se pudo actualizar el ticket");
  }

  return await ticketMessages.findById(insertResult.insertId);
};

export default ticketAuthorModels;
