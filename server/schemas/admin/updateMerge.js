import { authors } from "./authors";
import { users } from "./users";
import { updatePass } from "./updatePass";

export const updateAuthor = authors.merge(updatePass);

export const updateUser = users.merge(updatePass);