"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Video } from "lucide-react";
import Image from "next/image";
import GradientBorder from "../uiEffects/gradient-border";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";

export default function Hero2({ className, currentUser }) {
  const router = useRouter();
  const { loginModalOpen, setLoginModalOpen } = useContext(UiContext);

  return (
    <section
      className={cn(
        `
                    flex flex-col items-center gap-2 lg:flex-row
                    `,
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* <h1 className="font-inter text-base-muted-content px-6 text-lg">
            Smart email campaign builder, made for Developers
          </h1> */}
          <p className="font-pj text-base-content mt-5 text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            Descubre l@s mejores tatuadores de tu ciudad
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-5 px-8 sm:space-x-5 sm:px-0">
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
          </div>

          <p className="font-inter text-base-muted-content mt-8 text-base">
            Guarda artistas, tatuajes, y contacta GRATIS
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg">
        <div className="mx-auto object-contain lg:mx-auto lg:max-w-6xl">
          <Image
            className="mx-auto"
            width={700}
            height={700}
            src="/images/hero-image.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
