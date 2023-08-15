export default function FaqSection({
    faqs,
    title,
}) {
    return (
        <section className="relative z-[1] py-8 lg:py-12">
            <div className="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-lg md:max-w-3xl lg:max-w-5xl">


                {
                    <div className="mb-8 lg:mb-12">
                        <h1 className="text-4xl text-center">
                            {title ? title : ""}
                        </h1>
                    </div>
                }

                {/* 
                    {
                        <h1 className="text-4xl text-center">
                            {title ? { title } : "Preguntas frecuentes"}
                        </h1>
                    }
                </div> */}

                <ol className="text-points grid grid-cols-12 gap-y-8 lg:gap-12">

                    {
                        faqs.map((faq) => (
                            <li key={faq.question} className="text-points__item col-span-12 lg:col-span-6">
                                <div className="text-points__text">
                                    <h4 className="text-xl mb-2">{faq.question}</h4>

                                    <p className="text-sm text-primary">{faq.answer}</p>
                                </div>
                            </li>


                        ))

                    }

                </ol>
            </div>
        </section>
    );
}