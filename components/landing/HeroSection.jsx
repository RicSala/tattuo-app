"use client";

import Image from "next/image";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";
import GradientBorder from "../uiEffects/gradient-border";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function HeroSection({
  title = "",
  subtitle = "",
  cta = "",
  currentUser,
}) {
  const { loginModalOpen, setLoginModalOpen } = useContext(UiContext);
  const router = useRouter();

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-primary px-4 sm:px-6 lg:px-8 ">
      <Image
        src={"/images/hero-bg.jpeg"}
        fill
        alt="hero image"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div className="relative mx-auto overflow-hidden px-4 py-16 bg-blend-saturation sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16">
            {title && (
              <h1
                className="relative mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-primary-foreground sm:text-7xl sm:leading-none md:min-w-[550px]
                            
                            "
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <h2 className="mb-4 max-w-xl text-base text-primary-foreground md:text-lg">
                {subtitle}
              </h2>
            )}

            {cta && (
              <GradientBorder>
                <Button
                  size="lg"
                  onClick={() => {
                    currentUser
                      ? router.push("/tatuadores")
                      : setLoginModalOpen(true);
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
            )}
          </div>
          <div>{/* FORM */}</div>
        </div>
      </div>
    </div>
  );
}
