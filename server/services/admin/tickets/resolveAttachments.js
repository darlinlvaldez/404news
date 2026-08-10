import { supabase } from "@/server/services/supabase";
import db from "@/server/lib/db";

export async function resolveAttachments(messageIds) {
  if (messageIds.length === 0) return {};

  const [attachmentRows] = await db.query(
    `
    SELECT id, message_id, original_name, mime_type, file_size, file_path
    FROM ticket_attachments
    WHERE message_id IN (?)
    `,
    [messageIds]
  );

  if (attachmentRows.length === 0) return {};

  const signedResults = await Promise.all(
    attachmentRows.map((a) =>
      supabase.storage
        .from("ticket-files")
        .createSignedUrl(a.file_path, 60 * 10, { download: a.original_name })
    )
  );

  const attachmentsByMessage = {};

  attachmentRows.forEach((a, index) => {
    const result = signedResults[index];
    if (result.error) throw result.error;

    (attachmentsByMessage[a.message_id] ??= []).push({
      id: a.id,
      originalName: a.original_name,
      mimeType: a.mime_type,
      fileSize: a.file_size,
      url: result.data.signedUrl,
    });
  });

  return attachmentsByMessage;
}