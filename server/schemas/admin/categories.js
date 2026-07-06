import { z } from "zod";

export const categories = z
  .object({
    
    name: z
      .string()
      .trim()
      .min(1, "El título es obligatorio")
      .max(50, "Máximo 150 caracteres"),

    slug: z
      .string()
      .trim()
      .min(1, "El slug es obligatorio")
      .max(100, "Máximo 100 caracteres"),

    active: z.coerce.number().int().min(0).max(1)
  })
  .strict();