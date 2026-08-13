import { z } from "zod";
import {news} from "@/server/schemas/news"

export const updateNews = news.extend({
  author_id: z.number().int().positive().nullable().optional(),

  status: z.enum(
    ["draft", "pending", "published", "archived", "rejected"],
    {
      errorMap: () => ({
        message: "Estado inválido",
      }),
    }
  ),

  rejection_reason: z.string().max(1000).nullable().optional(),
})
.superRefine((data, ctx) => {
  if (
    data.status === "rejected" &&
    !data.rejection_reason?.trim()
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["rejection_reason"],
      message: "Debes indicar el motivo del rechazo",
    });
  }
})
.strict();