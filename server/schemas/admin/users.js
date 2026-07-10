import { z } from "zod";

const roles = ["superadmin", "admin", "support", "editor", "author"];

export const users = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio")
      .max(100, "Máximo 100 caracteres"),

    email: z
      .string()
      .trim()
      .min(1, "El email es obligatorio")
      .email("Debe ser un email válido")
      .max(255, "Máximo 255 caracteres"),

    role: z
      .string()
      .min(1, "Debe seleccionar un rol")
      .refine((value) => roles.includes(value), "Rol inválido"),

    active: z.coerce.number().int().min(0).max(1),
  })
  .strict();