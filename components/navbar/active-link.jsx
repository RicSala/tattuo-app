"use client";

import Link from "next/link";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { usePathname } from "next/navigation";

export function ActiveLink({ path, label }) {
  const pathname = usePathname();
  return (
    <Link href={path} legacyBehavior passHref>
      <NavigationMenuLink
        className={`${navigationMenuTriggerStyle()}
      ${
        path === pathname
          ? "underline decoration-primary/50 decoration-4 underline-offset-8"
          : ""
      }`}
      >
        {label}
      </NavigationMenuLink>
    </Link>
  );
}
