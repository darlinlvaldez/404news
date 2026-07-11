import { z } from "zod";
import { createAuthor, createUser } from "./createMerge";

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

export const confirmCreateAuthor = confirmCreatePassword(createAuthor);

export const confirmCreateUser = confirmCreatePassword(createUser);