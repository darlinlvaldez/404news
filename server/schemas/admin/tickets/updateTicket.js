import { z } from "zod";

export const updateTicketSchema = z.object({
  status: z.enum([
    "open",
    "in_progress",
    "waiting_response",
    "closed",
  ]).optional(),

  priority: z.enum([
    "low",
    "medium",
    "high",
  ]).optional(),
}).strict();