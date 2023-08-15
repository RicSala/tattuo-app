'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";
import GradientBorder from "../uiEffects/gradient-border";

export default function HeroSection({
    title = "",
    subtitle = "",
    cta = ""
}) {

    const { loginModalOpen, setLoginModalOpen } = useContext(UiContext)

    return (
        <div className="relative mx-auto w-full rounded-lg px-4 sm:px-6 lg:px-8 overflow-hidden
        ">
            <Image src={"/images/hero-bg.jpeg"} fill alt="hero image" className="
            absolute inset-0 h-full w-full object-cover
            
            " />

            <div className="
            bg-primary/30
            bg-blend-saturation
            relative mx-auto overflow-hidden px-4 py-16
            sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl 
            lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between xl:flex-row">
                    <div className="mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16">


                        {title &&
                            <h1 className="relative text-primary-foreground mb-6 md:min-w-[550px] max-w-lg font-sans text-3xl font-bold tracking-tight sm:text-7xl sm:leading-none
                            
                            "
                            >{title}</h1>
                        }
                        {subtitle && <h2
                            className="mb-4 max-w-xl text-base text-gray-200 md:text-lg"
                        >{subtitle}</h2>}

                        {cta &&
                            <GradientBorder>
                                <Button size="lg"
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
                        }
                    </div>
                    <div>
                        {/* FORM */}
                    </div>
                </div>

            </div>
        </div>
    );
}