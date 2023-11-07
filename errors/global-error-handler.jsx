"use client";

import { useGlobalErrorHandling } from "./useGlobalErrorHandling";

// This component is just to be able to use client code in the layout file
export function GlobalErrorHandler({}) {
  useGlobalErrorHandling();
}
