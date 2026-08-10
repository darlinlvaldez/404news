import { z } from "zod";

export const ticketContent = z.object({
  categoryId: z.coerce
    .number()
    .int("La categoría no es válida")
    .positive("Debes seleccionar una categoría"),

  subject: z
    .string()
    .trim()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(255, "Máximo 255 caracteres"),

  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje es demasiado largo"),
});