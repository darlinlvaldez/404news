import { z } from "zod";

export const newsBlock = z.discriminatedUnion("block_type", [
  z.object({
      block_type: z.literal("paragraph"),
      content: z
        .string()
        .trim()
        .min(1, "El párrafo no puede estar vacío"),
      position: z.number().int().nonnegative(),
    })
    .strict(),

  z.object({
      block_type: z.literal("heading"),
      content: z
        .string()
        .trim()
        .min(1, "El encabezado no puede estar vacío"),
      position: z.number().int().nonnegative(),
    })
    .strict(),

  z.object({
      block_type: z.literal("image"),
      image_url: z
        .string()
        .trim()
        .min(1, "La imagen es obligatoria")
        .max(255, "Máximo 255 caracteres"),

      alt_text: z
        .string()
        .trim()
        .max(255, "Máximo 255 caracteres")
        .optional(),

      position: z.number().int().nonnegative(),
    })
    .strict(),
]);

export const newsBlocks = z
  .array(newsBlock)
  .min(1, "La noticia debe tener al menos un bloque");