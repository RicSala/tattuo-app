"use client";

import { useEffect } from "react";
import CustomError from "./CustomError";
import { useHandleError } from "./useHandleError";

// The global listener in case some error occurs that we have not considered
export const useGlobalErrorHandling = () => {
  const handle = useHandleError();

  useEffect(() => {
    const handleWindowError = (event) => {
      event.preventDefault();
      console.log({ event });
      handle(
        new CustomError(event.error.message, "A window-level error occurred."),
      );
    };
    const handleUnhandledRejection = (event) => {
      event.preventDefault();
      handle(
        new CustomError(event.reason?.message || "Unhandled promise rejection"),
      );
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, [handle]);
};
