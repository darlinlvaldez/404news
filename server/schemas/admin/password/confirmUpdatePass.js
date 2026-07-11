import { z } from "zod";
import { updateAuthorSchema, updateUserSchema } from "../password/updateMerge";

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

export const confirmUpdateAuthor = confirmCreatePassword(updateAuthorSchema);

export const confirmUpdateUser = confirmCreatePassword(updateUserSchema);