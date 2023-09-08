'use client'

import { UiContext } from "@/providers/ui/ui-provider";
import { Button } from "./ui/button";
import GradientBorder from "./uiEffects/gradient-border";
import { useContext } from "react";

export default function CoolLoginButton({

}) {

    const { setLoginModalOpen } = useContext(UiContext)

    return (
        <GradientBorder>
            <Button
                onClick={() => { setLoginModalOpen(true) }}

                className="z-10 
                            w-[95%]
                            h-[86%]
                            hover:bg-primary
                            focus:!ring-offset-0
                            focus:!ring-0"
            >
                Entra
            </Button>
        </GradientBorder>
    );
}