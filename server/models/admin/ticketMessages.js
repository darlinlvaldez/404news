import db from "@/server/lib/db";

const ticketMessages= {};

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


ticketMessages.markReadAdmin = async function(ticketId, userId) {

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

export default ticketMessages;