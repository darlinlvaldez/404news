import { z } from "zod";
import { ticketContent } from "@/server/schemas/admin/tickets/shared";

export const contact = ticketContent.merge(
  z.object({
    guestName: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio")
      .max(50, "Máximo 50 caracteres"),

    guestEmail: z
      .string()
      .trim()
      .min(1, "El email es obligatorio")
      .email("Debe ser un email válido")
      .max(255, "Máximo 255 caracteres"),
  })
);