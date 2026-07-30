import { supabase } from "@/server/services/admin/supabase";
import crypto from "crypto";

export async function saveTicketAttachments(files) {
  const attachments = [];

  for (const file of files) {
    if (!(file instanceof File)) continue;

    const extension = file.name.split(".").pop();

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const path = `tickets/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("ticket-files")
      .upload(path, buffer, {
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    attachments.push({
      originalName: file.name,
      fileName,
      mimeType: file.type,
      fileSize: file.size,
      filePath: path,
    });
  }

  return attachments;
}
