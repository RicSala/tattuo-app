import { ToastDescription } from "@radix-ui/react-toast";

export default class CustomError extends Error {
  constructor(
    e,
    toastTitle = "Error inesperado",
    toastDescription = "Ha ocurrido un error inesperado. Por favor, inténtalo otra vez",
    logMessage = "ERROR - Not localized",
    isOperational = true,
  ) {
    super(e.message);
    this.name = "CustomError";
    this.message = e.message;
    this.toastTitle = toastTitle;
    this.toastDescription = toastDescription;
    this.logMessage = logMessage;
    this.statusCode = e.response?.status || 500;
    this.isOperational = isOperational; // If the error is known and expected (like validation errors)
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
 * @returns {CustomError} - The CustomError object
 */
export function createCustomError({
  e,
  toastTitle,
  ToastDescription,
  logMessage,
  isOperational,
}) {
  return new CustomError(
    e,
    toastTitle,
    ToastDescription,
    logMessage,
    isOperational,
  );
}
