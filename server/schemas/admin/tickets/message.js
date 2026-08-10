import { z } from "zod";

export const message = z.object({
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje es demasiado largo"),
});