'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";
import GradientBorder from "../uiEffects/gradient-border";
import { useRouter } from "next/navigation";

export default function HeroSection({
    title = "",
    subtitle = "",
    cta = "",
    currentUser,
}) {

    const { loginModalOpen, setLoginModalOpen } = useContext(UiContext)
    const router = useRouter()

    return (
        <div className="relative w-full px-4 mx-auto overflow-hidden rounded-lg sm:px-6 lg:px-8 bg-primary ">
            <Image src={"/images/hero-bg.jpeg"} fill alt="hero image" className="absolute inset-0 object-cover w-full h-full opacity-70" />

            <div className="relative px-4 py-16 mx-auto overflow-hidden bg-blend-saturation sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between xl:flex-row">
                    <div className="w-full max-w-xl mb-12 xl:mb-0 xl:w-7/12 xl:pr-16">


                        {title &&
                            <h1 className="relative text-primary-foreground mb-6 md:min-w-[550px] max-w-lg font-sans text-3xl font-bold tracking-tight sm:text-7xl sm:leading-none
                            
                            "
                            >{title}</h1>
                        }
                        {subtitle && <h2
                            className="max-w-xl mb-4 text-base text-primary-foreground md:text-lg"
                        >{subtitle}</h2>}

                        {cta &&
                            <GradientBorder>
                                <Button size="lg"
                                    onClick={() => {
                                        currentUser ?
                                            router.push("/tatuadores")
                                            :
                                            setLoginModalOpen(true)
                                    }}
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