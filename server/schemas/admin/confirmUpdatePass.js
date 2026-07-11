import { z } from "zod";
import { updateAuthor, updateUser } from "./updateMerge";

function confirmCreatePassword(schema) {
  return schema
    .extend({
      confirmPassword: z
        .string()
        .optional()
        .or(z.literal("")),
    })
    .refine(
      (data) => {
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
}

export const confirmUpdateAuthor = confirmCreatePassword(updateAuthor);

export const confirmUpdateUser = confirmCreatePassword(updateUser);