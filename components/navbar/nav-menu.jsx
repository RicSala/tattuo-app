"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ActiveLink } from "./active-link";

const navigationMenuItems = [
  {
    label: "Encuentra Tatuador",
    href: "/tatuadores",
    description: "Encuentra el tatuador perfecto para tu próximo tatuaje",
  },
  {
    label: "Descubre Tatuajes",
    href: "/tatuajes",
    description: "Descubre los mejores tatuajes de la comunidad",
  },
  {
    label: "Consejos",
    href: "/blog",
    description: "Consejos para tu próximo tatuaje",
  },
];

export function NavMenu({ currentUser }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationMenuItems.map((item) => (
          <ActiveLink key={item.href} path={item.href} label={item.label} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
