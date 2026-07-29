import { sileo } from "sileo";

export const toast = {
  success: (title, description = "") =>
    sileo.success({
      title,
      description,
    }),

  error: (title = "Error", description = "") =>
    sileo.error({
      title,
      description,
    }),

  warning: (title, description = "") =>
    sileo.warning({
      title,
      description,
    }),

  info: (title, description = "") =>
    sileo.info({
      title,
      description,
    }),

  action: (options) => sileo.action(options),

  promise: (promise, options) => sileo.promise(promise, options),

  dismiss: (id) => sileo.dismiss(id),

  clear: (position) => sileo.clear(position),
};