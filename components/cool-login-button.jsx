"use client";

import { UiContext } from "@/providers/ui/ui-provider";
import GradientBorder from "./uiEffects/gradient-border";
import { useContext } from "react";
import { Button } from "./ui/button";

export default function CoolLoginButton({}) {
  const { setLoginModalOpen } = useContext(UiContext);

  return (
    <GradientBorder>
      <Button
        onClick={() => {
          setLoginModalOpen(true);
        }}
        className="z-10 
                            h-[86%]
                            w-[95%]
                            hover:bg-primary
                            focus:!ring-0
                            focus:!ring-offset-0"
      >
        Entra
      </Button>
    </GradientBorder>
  );
}
