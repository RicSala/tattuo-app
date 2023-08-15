import Image from "next/image";

export default function ReviewsSection({
    reviews,
}) {


    return (
        <section>

            <div className="mb-8 lg:mb-12">
                <h1 className="text-center text-4xl">Quiénes lo han probado opinan...</h1>
            </div>
            <div className="grid grid-cols-12 gap-3 lg:gap-5">
                {

                    reviews.map((review) => (

                        <div key={review.rating} className="relative bg-primary/30 text-primary-foreground rounded-lg p-5 lg:p-8 text-center lg:flex lg:flex-col col-span-12 lg:col-span-4
                        overflow-hidden
                        ">
                            <Image src="/images/hero-bg.jpeg" fill alt="review image" className="absolute top-0 left-0 object-cover" />
                            <div className="absolute top-0 left-0 w-full h-full bg-primary/60"></div>


                            {/* RATING */}
                            <div className="relative rating rating--read-only js-rating js-rating--read-only mb-3 lg:mb-5">
                                <p className="sr-only">The rating of this product is <span className="rating__value js-rating__value">3.5</span> out of 5</p>

                                <div className="flex flex-row">
                                    <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="12 1.489 15.09 7.751 22 8.755 17 13.629 18.18 20.511 12 17.261 5.82 20.511 7 13.629 2 8.755 8.91 7.751 12 1.489" fill="currentColor" /></svg>
                                    <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="12 1.489 15.09 7.751 22 8.755 17 13.629 18.18 20.511 12 17.261 5.82 20.511 7 13.629 2 8.755 8.91 7.751 12 1.489" fill="currentColor" /></svg>
                                    <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="12 1.489 15.09 7.751 22 8.755 17 13.629 18.18 20.511 12 17.261 5.82 20.511 7 13.629 2 8.755 8.91 7.751 12 1.489" fill="currentColor" /></svg>
                                    <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="12 1.489 15.09 7.751 22 8.755 17 13.629 18.18 20.511 12 17.261 5.82 20.511 7 13.629 2 8.755 8.91 7.751 12 1.489" fill="currentColor" /></svg>
                                    <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="12 1.489 15.09 7.751 22 8.755 17 13.629 18.18 20.511 12 17.261 5.82 20.511 7 13.629 2 8.755 8.91 7.751 12 1.489" fill="currentColor" /></svg>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <blockquote className="relative leading-snug mb-5 lg:mb-8">
                                {/* <mark>Lorem ipsum dolor sit amet consectetur adipisicing elit</mark>. */}
                                {review.content}</blockquote>

                            {/* FOOTER */}
                            <footer className="relative flex flex-col items-center lg:mt-auto">
                                <div className="relative h-10 w-10">
                                    <Image fill className="block w-12 h-12 rounded-full border-2 border-white" src="/images/avatar.png" alt="Emily Ewing" />
                                </div>

                                <cite className="text-sm lg:text-base leading-tight lg:leading-tight">
                                    <strong className="not-italic">{review.author}</strong>
                                    <span className="block text-foreground mt-0.5 lg:mt-1 not-italic">Usuario Tattuo</span>
                                </cite>
                            </footer>


                        </div>
                    ))
                }

            </div>



        </section>
    );
}