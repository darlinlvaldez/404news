import { z } from "zod";

export const ticketContent = z.object({
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
});