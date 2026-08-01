export const addMessage = async (connection, { ticketId, senderType, senderId, message, isInternal = false, attachments = [] }) => {
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