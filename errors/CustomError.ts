import { HttpStatusCode } from "@/types";
import { BaseSyntheticEvent } from "react";

export default class BaseError extends Error {
    // Public properties
    statusCode: HttpStatusCode;
    isOperational: boolean;
    logMessage: string;
    originalError: BaseSyntheticEvent<object, any, any> | null = null;
    toastTitle: string;
    toastDescription: string;
    constructor(
        message: string,
        originalError: BaseSyntheticEvent<object, any, any> | null = null,
        statusCode: HttpStatusCode = 500,
        isOperational: boolean = true, // Operational: known and expected error (like validation errors). non operational = Programming: unexpected error
        logMessage: string = "ERROR - Not localized", // Internal message to log
        toastTitle: string = "Error inesperado", //
        toastDescription: string = "Ha ocurrido un error inesperado. Por favor, inténtalo otra vez",
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

        // V8 engine specific
        // It customizes and captures the current stack trace and assigns it to the error object
        // starts the stack trace at the point where BaseError is instantiated, excluding the BaseError constructor itself from the trace.
        // targetObject: The object on which to attach the stack trace.
        // constructorOpt: A function, calls to which should be omitted from the stack trace.

        //
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
