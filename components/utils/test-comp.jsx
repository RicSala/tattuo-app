"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../navbar/nav-bar";

// const currentUser = getCurrentUser();

export function TestComp() {
  const { data: session } = useSession({});
  return (
    <div>
      <NavBar currentUser={session?.user} />
      <h1>Session</h1>
      <p>{session ? JSON.stringify(session?.user) : null}</p>
    </div>
  );
}
