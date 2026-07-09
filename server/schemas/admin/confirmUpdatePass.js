import { z } from "zod";
import { updateAuthor } from "./updateAuthor";

export const confirmUpdateAuthor = updateAuthor
  .extend({
    confirmPassword: z
      .string()
      .optional()
      .or(z.literal(""))
  })
  .refine(
    data => {
      if (!data.password && !data.confirmPassword) {
        return true;
      }

      return data.password === data.confirmPassword;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }
  );