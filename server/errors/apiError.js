export class ApiError extends Error {
  constructor(status, field, message, details = {}) {
    super(message);

    this.status = status;
    this.field = field;
    this.details = details;
  }
}