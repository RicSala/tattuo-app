import { capitalizeFirst, cn } from "@/lib/utils";

export default function Stepper({
    children,
    steps,
    activeStep,
    setStep,
    ...props
}) {

    const stepWidth = 100 / (Object.keys(steps).length - 1);
    // const progressWidth = stepWidth * (activeStep + 1);
    const progressWidth = stepWidth * (activeStep);

    return (
        <div className="
        w-full 
        max-w-[600px]
        my-0
        mx-auto
        py-0
        px-4
        min-h-[50px]
        sm:min-h-[80px]
        ">
            <div className={cn(`
            progress-bar
            flex flex-row justify-between mt-20 relative
            before:content-['']
            before:absolute
            before:bg-zinc-400
            before:h-[4px]
            before:w-full
            before:top-1/2
            before:left-0
            before:-translate-y-1/2

            after:content-['']
            after:absolute
            after:bg-zinc-900
            after:h-[4px]
            after:top-1/2
            after:left-0
            after:-translate-y-1/2
            after:transition-all 
            after:duration-400 
            after:ease-in-out
            `)}>


                {
                    // steps is an object. create a div for each property in steps
                    Object.keys(steps).map((step, index) => (
                        <div key={step} className="relative z-[1]">
                            <div className={cn(`
                        flex
                        justify-center
                        items-center
                        w-10 h-10 
                        rounded-full 
                        bg-muted 
                        border-zinc-400 
                        border-2
                        transition-all duration-400 ease-in-out
                        cursor-pointer
                        `, { 'bg-primary': index === activeStep, })}
                                onClick={() => setStep(index)}
                            >
                                <div className={cn("text-lg text-muted-foreground ",
                                    {
                                        'text-primary-foreground': index === activeStep,
                                    }
                                )
                                }>

                                    {
                                        // if the step is less than the active step, show a checkmark
                                        // otherwise, show the step number
                                        index < activeStep ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            :
                                            step * 1 + 1
                                    }
                                </div>
                                <div className="absolute hidden -translate-x-1/2 -translate-y-1/2 top-16 left-1/2 sm:block">
                                    <div className={cn("text-muted-foreground",
                                        { 'text-primary': index === activeStep, }
                                    )}>
                                        {
                                            steps[step].label
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>

            <style jsx>
                {`
                .progress-bar:after {
                    width: ${progressWidth}%;
                }

                `}
            </style>
        </div>
    )
}

