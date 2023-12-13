"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import GradientBorder from "../uiEffects/gradient-border";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession({});
  const currentUser = session?.user;

  const { setLoginModalOpen } = useContext(UiContext);

  return (
    <section
      className="cta-banner overflow-hidden rounded-xl bg-primary p-6 shadow-[0_0_0_1px_hsl(221_39%_11%/0.05),0_0.3px_0.4px_hsl(221_39%_11%/0.02),0_0.9px_1.5px_hsl(221_39%_11%/0.045),0_3.5px_6px_hsl(221_39%_11%/0.09)]
"
    >
      <div className="grid items-center gap-6 lg:grid-cols-2">
        <div className="lg:col-1 grid min-w-0 gap-3 lg:pl-6">
          <h1 className="text-[1.75rem] text-primary-foreground">
            ÚNETE A TATTUO
          </h1>

          <p className="text-[0.9375rem] text-primary-foreground lg:text-lg lg:leading-tight">
            Contacta con tatuadores cerca de ti. Inspírate. Guarda tus diseños
            favoritos. Y es <b>GRATIS</b>.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <GradientBorder>
              <Button
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
                                                            focus:!ring-offset-0
          "
              >
                Entra
              </Button>
            </GradientBorder>
          </div>
        </div>

        <figure className="lg:col-1 min-w-0">
          <Image
            width={200}
            height={100}
            className="w-full rounded-md"
            src="/images/tatuador-trabajando.png"
            alt="Image description"
          />
        </figure>
      </div>
    </section>
  );
}
