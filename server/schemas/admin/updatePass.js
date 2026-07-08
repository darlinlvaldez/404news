import { z } from "zod";

export const updatePass = z
  .object({
    password: z
      .string()
      .max(255, "Máximo 255 caracteres")
      .optional()
      .or(z.literal("")),
  })
  .strict();