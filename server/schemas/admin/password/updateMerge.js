import { authors } from "../authors";
import { users } from "../users";
import { updatePass } from "./updatePass";

export const updateAuthorSchema = authors.merge(updatePass);

export const updateUserSchema = users.merge(updatePass);