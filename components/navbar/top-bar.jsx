"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Container from "../container";

export default function TopBar({
  text = "This is a topbar Message!",
  shown = false,
  setShown,
  className,
}) {
  if (!shown) return;

  return (
    <div className="group relative flex h-8 min-w-full items-center justify-center bg-secondary">
      <Container className={""}>
        <div className="relative mx-auto max-w-7xl">
          <div className="flex w-full items-center justify-center">
            {/*   -mt-1 sm:-mt-4 mb-1 sm:mb-4 */}
            {/* TODO: Pending. I was not able to create the animation - Do it when learnt */}
            {/* <p className="animate-horizontal"> */}
            <p className="">{text}</p>
          </div>
          <div
            className="absolute right-2 top-1 hidden text-secondary-content hover:cursor-pointer group-hover:block"
            onClick={() => setShown(false)}
          >
            <X size={20} />
          </div>
        </div>
      </Container>
    </div>
  );
}
