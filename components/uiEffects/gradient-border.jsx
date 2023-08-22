import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function GradientBorder({
    children, className
}) {
    return (



        <div
            className={cn(`
        w-32
            h-10
        cursor-pointer
        
        flex
        items-center
        justify-center
        relative
        rounded-lg
        shadow-sm
        overflow-hidden
        hover:scale-110
        transition-transform


        before:content-['']
        before:absolute
        before:w-[110%]
        before:h-[350%]
        before:bg-[conic-gradient(#FF2E2E,#FF831E,#FCFF51,#58FF57,#575FFF,#D257FF,#FF57E5,#FF1556)]
        before:animate-spin
                    `,
                className
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