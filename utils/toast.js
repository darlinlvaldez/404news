import { sileo } from "sileo";

export const toast = {
  created: (entity) =>
    sileo.success({
      title: `${entity}`,
      description: "La información se ha guardado correctamente.",
    }),

  updated: (entity) =>
    sileo.success({
      title: `${entity}`,
      description: "Los cambios se han guardado correctamente.",
    }),

  deleted: (entity) =>
    sileo.success({
      title: `${entity}`,
      description: "Se ha eliminó correctamente.",
    }),

  error: (message = "Ocurrió un error inesperado.") =>
    sileo.error({
      title: "Error",
      description: message,
    }),
};