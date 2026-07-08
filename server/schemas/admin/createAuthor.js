import { authors } from "./authors";
import { createPass } from "./createPass";

export const createAuthor = authors.merge(createPass);