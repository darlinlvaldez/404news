import { z } from "zod";
import { createAuthor } from "./createAuthor";

export const confirmPass = createAuthor
  .extend({
    confirmPassword: z
      .string()
      .min(1, "Debe confirmar la contraseña"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });