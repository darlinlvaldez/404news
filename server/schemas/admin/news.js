import { z } from "zod";

export const news = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "El título es obligatorio")
      .max(150, "Máximo 150 caracteres"),

    slug: z
      .string()
      .trim()
      .min(1, "El slug es obligatorio")
      .max(100, "Máximo 100 caracteres"),

    excerpt: z
      .string()
      .trim()
      .min(1, "El resumen es obligatorio")
      .max(150, "Máximo 150 caracteres"),

    cover_image: z
      .string()
      .trim()
      .min(1, "La imagen es obligatoria")
      .max(255, "Máximo 255 caracteres"),

    author_id: z.number().int().positive().nullable().optional(),

    category_id: z.coerce
      .number({
        required_error: "La categoría es obligatoria",
        invalid_type_error: "La categoría es obligatoria",
      })
      .int("La categoría debe ser un número entero")
      .positive("La categoría es obligatoria"),

    status: z.enum(["draft", "review", "published"], {
      errorMap: () => ({
        message: "Estado inválido",
      }),
    }),
  })
  .strict();
