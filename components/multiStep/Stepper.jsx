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
  const progressWidth = stepWidth * activeStep;

  return (
    <div
      className="
        mx-auto 
        my-0
        min-h-[50px]
        w-full
        max-w-[600px]
        px-4
        py-0
        sm:min-h-[80px]
        "
    >
      <div
        className={cn(`
            progress-bar
            after:duration-400 relative mt-20 flex flex-row
            justify-between
            before:absolute
            before:left-0
            before:top-1/2
            before:h-[4px]
            before:w-full
            before:-translate-y-1/2
            before:bg-zinc-400

            before:content-['']
            after:absolute
            after:left-0
            after:top-1/2
            after:h-[4px]
            after:-translate-y-1/2
            after:bg-zinc-900
            after:transition-all 
            after:ease-in-out 
            after:content-['']
            `)}
      >
        {
          // steps is an object. create a div for each property in steps
          Object.keys(steps).map((step, index) => (
            <div key={step} className="relative z-[1]">
              <div
                className={cn(
                  `
                        duration-400
                        flex
                        h-10
                        w-10 cursor-pointer 
                        items-center 
                        justify-center 
                        rounded-full 
                        border-2
                        border-zinc-400 bg-muted transition-all
                        ease-in-out
                        `,
                  { "bg-primary": index === activeStep },
                )}
                onClick={() => setStep(index)}
              >
                <div
                  className={cn("text-lg text-muted-foreground ", {
                    "text-primary-foreground": index === activeStep,
                  })}
                >
                  {
                    // if the step is less than the active step, show a checkmark
                    // otherwise, show the step number
                    index < activeStep ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step * 1 + 1
                    )
                  }
                </div>
                <div className="absolute left-1/2 top-16 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
                  <div
                    className={cn("text-muted-foreground", {
                      "text-primary": index === activeStep,
                    })}
                  >
                    {steps[step].label}
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
  );
}
