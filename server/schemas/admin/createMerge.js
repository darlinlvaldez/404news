import { authors } from "./authors";
import { users } from "./users";
import { createPass } from "./createPass";

export const createAuthor = authors.merge(createPass);

export const createUser = users.merge(createPass);