export default function BenefitsSection({
    benefits,
    title
}) {
    return (
        <section className="feature-v20 relative z-[1] py-16">
            <div className="w-[calc(100%_-_3rem)] mx-auto max-w-3xl mb-20">
                <h1 className="text-4xl text-center font-bold">{title}</h1>
            </div>

            <div

                className="w-[calc(100%_-_3rem)] mx-auto max-w-lg lg:max-w-5xl xl:max-w-7xl">
                <ul className="feature-v20__list grid grid-cols-12 gap-8">

                    {
                        Object.keys(benefits).map((benefit, index) => {
                            return (

                                <li key={index} className="feature-v20__item min-w-0 col-span-12 md:col-span-6 lg:col-span-3">
                                    {/* <figure className="relative h-[52px] w-[52px] rounded-full flex items-center justify-center mx-auto mt-0 mb-6 text-primary shadow-[0_0_0_1px_hsla(230,13%,9%,0.05)]">
                                        <svg className="h-6 w-6 inline-block text-inherit fill-current leading-none z-[2]" viewBox="0 0 24 24" aria-hidden="true">
                                            <g fill="currentColor">
                                                <path d="M21 10H3c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h18c1.103 0 2 .897 2 2v3c0 1.103-.897 2-2 2z"></path>
                                                <rect x="1" y="12" width="6" height="9" rx="2" ry="2" opacity=".4"></rect>
                                                <rect x="9" y="12" width="14" height="9" rx="2" ry="2" opacity=".4"></rect>
                                            </g>
                                        </svg>
                                    </figure> */}

                                    <div className="text-center">
                                        <h4 className="font-bold text-2xl mb-3">{benefit}</h4>
                                        <p className="text-lg text-primary">{benefits[benefit]}</p>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>

        </section>
    );
}