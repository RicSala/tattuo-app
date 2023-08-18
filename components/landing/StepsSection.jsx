import Image from "next/image";

export default function StepsSection({
  steps,
  title
}) {
  return (
    <div>

      <section className="hiw-v2 relative z-[1] py-12 lg:py-20">
        <div className="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="mb-12 lg:mb-20">
            <h1 className="text-4xl text-center">{title}</h1>
          </div>
          <ul className="flex flex-col md:flex-row gap-4">


            {
              steps.map((step, index) => {
                return (
                  <li key={index} className="relative mb-8 sm:mb-0">
                    <div className="lg:mb-8">
                      <div className="relative min-h-[200px]">
                        <Image fill className="block w-full rounded-lg shadow-md object-cover" src={step.imageUrl} alt="Image description" />
                      </div>

                      <div className="h-10 w-full flex justify-center">
                        <svg className="" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="20" className="bg-primary" />
                          <polyline points="29 17 20 26 11 17" fill="none" className="stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl mb-1 mt-0">{step.title}</h2>
                      <p className="text-lg text-primary">{step.description}</p>
                    </div>
                  </li>
                )
              })
            }




          </ul>
        </div>
      </section>
    </div>
  );
}