import { authors } from "../authors";
import { users } from "../users";
import { createPass } from "./createPass";

export const createAuthorSchema = authors.merge(createPass);

export const createUserSchema = users.merge(createPass);