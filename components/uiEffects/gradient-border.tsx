import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GradientBorderProps = {
    children: ReactNode;
    className?: string;
};

export default function GradientBorder({
    children,
    className,
}: GradientBorderProps) {
    return (
        <div
            className={cn(
                `
        relative
            flex
        h-10
        
        w-32
        cursor-pointer
        items-center
        justify-center
        overflow-hidden
        rounded-lg
        shadow-sm
        transition-transform
        before:absolute


        before:h-[350%]
        before:w-[110%]
        before:animate-spin
        before:bg-[conic-gradient(#FF2E2E,#FF831E,#FCFF51,#58FF57,#575FFF,#D257FF,#FF57E5,#FF1556)]
        before:content-['']
        hover:scale-110
                    `,
                className,
            )}
        >
            {children}

            {/* <div
                    after="Hover me!"
                    className="
    gradient_button
  w-32
  h-12
  rounded-[1em]
  shadow-[0_1em_1em_rgba(0,0,0,.5)]
  relative
  flex
  items-center
  justify-center
  overflow-hidden 




   after:bg-black
   after:absolute
  after:w-[96%]
  after:h-[86%]
  after:text-white   
  after:flex
  after:items-center
  after:justify-center
  after:rounded-[1em]

  ">
                    {children}
                </div> */}
        </div>
    );
}
