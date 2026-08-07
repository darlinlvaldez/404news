import crypto from "crypto";
import { fileTypeFromBuffer } from "file-type";
import { supabase } from "@/server/services/supabase";

const ALLOWED_TYPES = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
  "application/pdf": ["pdf"],
  "text/plain": ["txt"],
};

const MAX_FILES_PER_MESSAGE = 10;

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function saveTicketAttachments(files) {

  if (files.length > MAX_FILES_PER_MESSAGE) {
    throw new Error(
      `Solo se permiten ${MAX_FILES_PER_MESSAGE} archivos por mensaje`
    );
  }

  const attachments = [];

  for (const file of files) {
    if (!(file instanceof File)) continue;

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `El archivo "${file.name}" supera el límite de 20 MB.`
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = await fileTypeFromBuffer(buffer);

    const realMimeType = detected?.mime ?? file.type;

    if (!(realMimeType in ALLOWED_TYPES)) {
      throw new Error(
        `Archivo "${file.name}" no permitido (tipo detectado: ${realMimeType})`
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || extension === file.name.toLowerCase()) {
      throw new Error("El archivo no tiene una extensión válida.");
    }

    const allowedExtensions = ALLOWED_TYPES[realMimeType];

    if (!allowedExtensions.includes(extension)) {
      throw new Error("La extensión no coincide con el tipo del archivo");
    }

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const path = `tickets/${fileName}`;

    const { error } = await supabase.storage
      .from("ticket-files")
      .upload(path, buffer, {
        contentType: realMimeType
      });

    if (error) {
      throw error;
    }

    attachments.push({
      originalName: file.name,
      fileName,
      mimeType: realMimeType,
      fileSize: file.size,
      filePath: path,
    });
  }

  return attachments;
}
