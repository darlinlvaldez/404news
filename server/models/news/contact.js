import db from '@/server/lib/db'
import {addMessage} from '@/server/services/admin/tickets/addMessages'

export const createTicket = async ({
  guestName,
  guestEmail,
  type = "contact",
  subject,
  message,
  senderType = "customer",
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [ticketResult] = await connection.execute(
      `
      INSERT INTO tickets
        (type, subject, status, guest_name, guest_email)
      VALUES (?, ?, ?, ?, ?)
      `,
      [type, subject, "open", guestName, guestEmail]
    );

    const ticketId = ticketResult.insertId;

    const ticketNumber = `TCK-${String(ticketId).padStart(6, "0")}`;

    const messageId = await addMessage(connection, {
      ticketId,
      senderType,
      message,
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