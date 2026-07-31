import db from "@/server/lib/db";
import ticketMessages from "@/server/models/admin/ticketMessages";
import {existsByTicket} from '@/server/models/admin/exist'
import { supabase } from "@/server/services/admin/supabase";

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
      tm.author_read,
      u.role AS sender_role,
      COALESCE(a.name, u.name, u.username) AS sender_name,
      a.avatar AS sender_avatar
    FROM ticket_messages tm
    LEFT JOIN users u ON u.id = tm.sender_id
    LEFT JOIN authors a ON u.id = a.user_id
    INNER JOIN tickets t ON t.id = tm.ticket_id AND t.user_id = ?
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
  const messages = rows.reverse();

  if (messages.length === 0) return messages;

  const messageIds = messages.map((m) => m.id);

  const [attachmentRows] = await db.query(
    `
    SELECT id, message_id, original_name, mime_type, file_size, file_path
    FROM ticket_attachments
    WHERE message_id IN (?)
    `,
    [messageIds]
  );

  const attachmentsByMessage = attachmentRows.reduce((acc, a) => {
    (acc[a.message_id] ??= []).push(a);
    return acc;
  }, {});

  const paths = attachmentRows.map((a) => a.file_path);

  let signedUrlByPath = {};
  if (attachmentRows.length > 0) {
    const signedResults = await Promise.all(
      attachmentRows.map((a) =>
        supabase.storage
          .from("ticket-files")
          .createSignedUrl(a.file_path, 60 * 10, {
            download: a.original_name,
          })
      )
    );

    signedResults.forEach((result, index) => {
      if (result.error) throw result.error;
      signedUrlByPath[attachmentRows[index].file_path] = result.data.signedUrl;
    });
  }

  return messages.map((m) => ({
    ...m,
    attachments: (attachmentsByMessage[m.id] ?? []).map((a) => ({
      id: a.id,
      originalName: a.original_name,
      mimeType: a.mime_type,
      fileSize: a.file_size,
      url: signedUrlByPath[a.file_path] ?? null,
    })),
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

    const [insertResult] = await connection.execute(
      `
      INSERT INTO ticket_messages
        (ticket_id, sender_type, sender_id, message)
      VALUES (?, ?, ?, ?)
      `,
      [ticketId, senderType, senderId, message]
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

    const [updateResult] = await connection.execute(
      `
      UPDATE tickets
      SET
        last_reply_at = NOW(),
        updated_at = NOW(),
        last_message_id = ?,
        unread_user_count = unread_user_count + 1
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