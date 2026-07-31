import crypto from "crypto";
import { fileTypeFromBuffer } from "file-type";
import { supabase } from "@/server/services/admin/supabase";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/zip",
  "application/x-rar-compressed",
]);


export async function saveTicketAttachments(files) {
  const attachments = [];

  for (const file of files) {
    if (!(file instanceof File)) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = await fileTypeFromBuffer(buffer);

    const realMimeType = detected?.mime ?? file.type;

    if (!ALLOWED_MIME_TYPES.has(realMimeType)) {
      throw new Error(
        `Archivo "${file.name}" no permitido (tipo detectado: ${realMimeType})`
      );
    }

    const extension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const path = `tickets/${fileName}`;

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
