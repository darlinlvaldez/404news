import { z } from "zod";

export const authors = z
  .object({
    // USERS
    email: z
      .string()
      .trim()
      .min(1, "El email es obligatorio")
      .email("Debe ser un email válido")
      .max(255, "Máximo 255 caracteres"),

    active: z.coerce
      .number()
      .int()
      .min(0)
      .max(1),

    // AUTHORS
    name: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio")
      .max(50, "Máximo 50 caracteres"),

    slug: z
      .string()
      .trim()
      .min(1, "El slug es obligatorio")
      .max(100, "Máximo 100 caracteres")
      .regex(/^[a-z0-9-]+$/, "Solo se permiten letras minúsculas, números y guiones"),

    avatar: z
      .string()
      .trim()
      .min(1, "El avatar es obligatorio")
      .max(255, "Máximo 255 caracteres"),

    bio: z
      .string()
      .trim()
      .max(500, "Máximo 500 caracteres")
      .optional()
      .or(z.literal(""))
  })
  .strict();