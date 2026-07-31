import db from "@/server/lib/db";
import {resolveAttachments} from "@/server/services/admin/resolveAttachments";

const ticketMessages= {};

ticketMessages.findById = async (id) => {
  const [rows] = await db.execute(
    `
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
    WHERE tm.id = ?
    LIMIT 1
    `,
    [id]
  );

  const message = rows[0] ?? null;
  if (!message) return null;

  const attachmentsByMessage = await resolveAttachments([id]);

  return { ...message, attachments: attachmentsByMessage[id] ?? [] };
};

ticketMessages.markReadAuthor = async function(ticketId, userId) {
  const [markReadResult] = await db.query(
    `
    UPDATE ticket_messages tm
    INNER JOIN tickets t ON t.id = tm.ticket_id
    SET tm.author_read = 1
    WHERE tm.ticket_id = ?
      AND t.user_id = ?
      AND tm.sender_type = 'admin'
      AND tm.author_read = 0
    `,
    [ticketId, userId]
  );

  const [resetCounterResult] = await db.query(
    `
    UPDATE tickets
    SET unread_admin_count = 0
    WHERE id = ?
    `,
    [ticketId]
  );

  return { markReadResult, resetCounterResult }
};

ticketMessages.markReadAdmin = async function(ticketId) {
  const [markReadResult] = await db.query(
    `
    UPDATE ticket_messages
    SET admin_read = 1
    WHERE ticket_id = ?
      AND sender_type = 'author'
      AND admin_read = 0
    `,
    [ticketId]
  );

  const [resetCounterResult] = await db.query(
    `
    UPDATE tickets
    SET unread_user_count = 0
    WHERE id = ?
    `,
    [ticketId]
  );

  return { markReadResult, resetCounterResult };
};

export default ticketMessages;