import { z } from "zod";
import { ticketContent } from "../shared/ticket";

export const tickets = ticketContent.merge(
  z.object({
    authorId: z.coerce.number().int().positive(),
    category: z.string().trim().min(1),
  })
);