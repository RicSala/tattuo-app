'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import GradientBorder from "../uiEffects/gradient-border";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";

export default function Banner({

}) {

    const { setLoginModalOpen } = useContext(UiContext)


    return (
        <section className="cta-banner p-6 bg-primary rounded-xl overflow-hidden shadow-[0_0_0_1px_hsl(221_39%_11%/0.05),0_0.3px_0.4px_hsl(221_39%_11%/0.02),0_0.9px_1.5px_hsl(221_39%_11%/0.045),0_3.5px_6px_hsl(221_39%_11%/0.09)]
">
            <div className="grid items-center gap-6 lg:grid-cols-2">
                <div className="grid gap-3 min-w-0 lg:pl-6 lg:col-1">
                    <h1 className="text-[1.75rem] text-primary-foreground">ÚNETE A TATTUO</h1>

                    <p className="text-[0.9375rem] text-muted-foreground lg:text-lg lg:leading-tight">Contacta con tatuadores cerca de ti. Inspírate. Guarda tus diseños favoritos. Y es <b>GRATIS</b>.</p>

                    <div className="flex flex-wrap items-center gap-4">

                        <GradientBorder>
                            <Button
                                onClick={() => { setLoginModalOpen(true) }}

                                className="z-10 
                                                            w-[95%]
                                                            h-[86%]
                                                            hover:bg-primary
                                                            focus:!ring-offset-0
                                                            focus:!ring-0
          "
                            >
                                Entra
                            </Button>
                        </GradientBorder>
                    </div>
                </div>

                <figure className="min-w-0 lg:col-1">
                    <Image width={200} height={100} className="w-full rounded-md" src="/images/tatuador-trabajando.png" alt="Image description" />
                </figure>
            </div>
        </section>

    );
}