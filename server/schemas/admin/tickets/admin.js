import { z } from "zod";
import { ticketContent } from "@/server/schemas/admin/tickets/shared";

export const tickets = ticketContent.extend({
  authorId: z.coerce
    .number()
    .int()
    .positive("Debes seleccionar un autor"),
});