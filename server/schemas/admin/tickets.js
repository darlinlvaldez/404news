import { z } from "zod";

export const tickets = z
  .object({
    authorId: z.coerce.number().int().positive("Debes seleccionar un autor"),

    category: z.string().trim().min(1, "Debes seleccionar una categoría"),

    subject: z
      .string()
      .trim()
      .min(5, "El asunto debe tener al menos 5 caracteres")
      .max(255, "Máximo 255 caracteres"),

    message: z
      .string()
      .trim()
      .min(10, "El mensaje debe tener al menos 10 caracteres")
      .max(500, "Máximo 500 caracteres"),
  })
  .strict();