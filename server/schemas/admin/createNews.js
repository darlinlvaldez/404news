import { z } from "zod";
import {news} from "@/server/schemas/news"

export const createNews = news.extend({
  author_id: z.number().int().positive().nullable().optional(),

  status: z.enum(
    ["draft", "pending", "published", "archived"],
    {
      errorMap: () => ({
        message: "Estado inválido",
      }),
    }
  ),
}).strict();