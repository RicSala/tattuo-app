import Image from "next/image";
import { Button } from "../ui/button";

export default function HeroSection({
    title = "",
    subtitle = "",
    cta = ""
}) {
    return (
        <div className="relative mx-auto w-full rounded-lg px-4 sm:px-6 lg:px-8 overflow-hidden">
            <Image src={"/images/hero-bg.jpeg"} fill alt="hero image" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative mx-auto overflow-hidden px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between xl:flex-row">
                    <div className="mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16">


                        {title &&
                            <h1 className="relative text-primary-foreground mb-6 md:min-w-[550px] max-w-lg font-sans text-3xl font-bold tracking-tight sm:text-7xl sm:leading-none"
                            >{title}</h1>
                        }
                        {subtitle && <h2
                            className="mb-4 max-w-xl text-base text-gray-200 md:text-lg"
                        >{subtitle}</h2>}

                        {cta && <Button>
                            {cta}
                        </Button>
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