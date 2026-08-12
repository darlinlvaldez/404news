import { authors } from "@/server/schemas/admin/authors";
import { users } from "@/server/schemas/admin/users";
import { updatePass } from "@/server/schemas/admin/password/updatePass";

export const updateAuthorSchema = authors.merge(updatePass);

export const updateUserSchema = users.merge(updatePass);