import { z } from "zod";
import { createAuthorSchema, createUserSchema } from "../password/createMerge";

function confirmCreatePassword(schema) {
  return schema
    .extend({
      confirmPassword: z
        .string()
        .min(1, "Debe confirmar la contraseña"),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      }
    );
}

export const confirmCreateAuthor = confirmCreatePassword(createAuthorSchema);

export const confirmCreateUser = confirmCreatePassword(createUserSchema);