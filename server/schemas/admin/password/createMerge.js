import { authors } from "@/server/schemas/admin/authors";
import { users } from "@/server/schemas/admin/users";
import { createPass } from "@/server/schemas/admin/password/createPass";

export const createAuthorSchema = authors.merge(createPass);

export const createUserSchema = users.merge(createPass);