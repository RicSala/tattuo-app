"use client";

import { SessionProvider as AuthSessionProvider } from "next-auth/react";
export default function SessionProvider({ children }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
