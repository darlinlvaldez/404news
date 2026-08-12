import { z } from "zod";
import {news} from "@/server/schemas/news"

export const newsAdmin = news.extend({
  author_id: z.number().int().positive().nullable().optional(),

  status: z.enum(["draft", "review", "published", "archived", "rejected"], {
    errorMap: () => ({
      message: "Estado inválido",
    }),
  }),
})
.strict()