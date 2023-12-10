export default class BaseError extends Error {
  constructor(
    message,
    originalError = null,
    statusCode = 500,
    isOperational = true,
    logMessage = "ERROR - Not localized",

    toastTitle = "Error inesperado",
    toastDescription = "Ha ocurrido un error inesperado. Por favor, inténtalo otra vez",
    // friendlyMessage = "Ha ocurrido un error inesperado.",
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational; // If the error is known and expected (like validation errors)
    this.logMessage = logMessage;
    this.originalError = originalError;
    this.toastTitle = toastTitle;
    this.toastDescription = toastDescription;
    Error.captureStackTrace(this, this.constructor);

    // this.toastTitle = toastTitle;
    // this.toastDescription = toastDescription;
    // this.friendlyMessage = friendlyMessage;
    // this.message = e?.message;
    // this.originalError = e;
  }
}

export function createBaseError({
  message,
  originalError,
  statusCode,
  isOperational,
  logMessage,
}) {
  return new BaseError(
    message,
    originalError,
    statusCode,
    isOperational,
    logMessage,
  );
}
