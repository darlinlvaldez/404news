import { z } from "zod";

export const createPass = z
  .object({
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(255, "Máximo 255 caracteres"),
  })
  .strict();