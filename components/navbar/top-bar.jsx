"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Container from "../container";
import { cn } from "@/lib/utils";

export default function TopBar({
  shown = false,
  setShown,
  children,
  className,
}) {
  if (!shown) return;

  return (
    <div
      className={cn(
        `group relative flex h-8 min-w-full items-center justify-center bg-secondary`,
        className,
      )}
    >
      <Container className={""}>
        <div className="relative mx-auto max-w-7xl">
          <div className="flex w-full items-center justify-center">
            {/*   -mt-1 sm:-mt-4 mb-1 sm:mb-4 */}
            {/* TODO: Pending. I was not able to create the animation - Do it when learnt */}
            {/* <p className="animate-horizontal"> */}
            {children}
          </div>
          <div
            className="text-secondary-content absolute right-2 top-1 hidden hover:cursor-pointer group-hover:block"
            onClick={() => setShown(false)}
          >
            <X size={20} />
          </div>
        </div>
      </Container>
    </div>
  );
}
