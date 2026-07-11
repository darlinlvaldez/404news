import { z } from "zod";

export const updatePass = z
  .object({
    user_id: z.coerce.number().int().positive(),

    password: z
      .string()
      .max(255, "Máximo 255 caracteres")
      .optional()
      .or(z.literal("")),
  })
  .strict();