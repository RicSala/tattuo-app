export default class BaseError extends Error {
  constructor(
    message,
    originalError = null,
    statusCode = 500,
    isOperational = true,
    logMessage = "ERROR - Not localized",

    // toastTitle = "Error inesperado",
    // toastDescription = "Ha ocurrido un error inesperado. Por favor, inténtalo otra vez",
    // friendlyMessage = "Ha ocurrido un error inesperado.",
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational; // If the error is known and expected (like validation errors)
    this.logMessage = logMessage;
    this.originalError = originalError;
    Error.captureStackTrace(this, this.constructor);

    // this.toastTitle = toastTitle;
    // this.toastDescription = toastDescription;
    // this.friendlyMessage = friendlyMessage;
    // this.message = e?.message;
    // this.originalError = e;
  }
}

/**
 * Creates a CustomError object
 * @param {Object} params
 * @param {Error} params.e - The error object
 * @param {string} params.toastTitle - The title of the toast
 * @param {ToastDescription} params.ToastDescription - The description of the toast
 * @param {string} params.logMessage - The message to be logged
 * @param {boolean} params.isOperational - If the error is known and expected (like validation errors)
 *
 * @returns {BaseError} - The CustomError object
 */
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
