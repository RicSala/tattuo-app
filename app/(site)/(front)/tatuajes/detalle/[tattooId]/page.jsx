import { getCurrentUser } from "@/actions/getCurrentUser";
import getSimilarTattoos from "@/actions/getSimilarTattoos";
import { getTattoosById } from "@/actions/getTattooById";
import ArtistSmallCard from "@/components/artist/artist-bio";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import ShareButtons from "@/components/share-buttons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { notFound } from "next/navigation";

const TattooDetailsPage = async ({ params }) => {



    // TODO: Intercepting routes to show in a modal
    // TODO: Head for SEO (title, description, etc)
    // TODO: rss feed (https://nextjs.org/docs/app/building-your-application/routing/router-handlers#non-ui-responses)
    // REVIEW: what is turbopack?

    // const tattoo = await getTattoosById(params.tattooId);
    // const similarTattoos = await getSimilarTattoos(tattoo);
    // const currentUser = await getCurrentUser();
    // let's change the preview to a promise.all to get all the data at once in parallel


    const tattooPromise = getTattoosById(params.tattooId);
    const currentUserPromise = getCurrentUser();
    const [tattoo, currentUser] = await Promise.all([tattooPromise, currentUserPromise])

    const similarTattoos = await getSimilarTattoos(tattoo);


    const hostname = process.env.NODE_ENV === "production" ? `${process.env.HOST_NAME_PROD}/api/artists` : `${process.env.HOST_NAME_DEV}/api/artists`


    if (!tattoo) {
        return (
            notFound()
        )
    }


    const age = Math.floor((new Date() - new Date(tattoo.createdAt)) / (1000 * 60 * 60 * 24));

    console.log((tattoo))

    return (


        <div className="">
            <div className="max-w-screen-lg mx-auto mt-3 overflow-hidden border shadow-lg sm:m-10 rounded-xl">
                <div className="flex flex-col overflow-hidden lg:flex-row md:h-[70vh]">

                    <div className="order-first md:order-none aspect-auto
                    sm:min-h-[60vh]

                    min-h-[50vh]
                    relative
                    w-full
                    ">
                        <Image alt="tattoo" fill src={tattoo.imageSrc} loading="lazy" className="object-contain "
                        />
                    </div>

                    <div className="flex flex-col justify-between flex-shrink-0 sidebar basis-80 lg:overflow-x-auto">
                        <div>
                            <h2 className="px-4 pt-1 mt-0 sm:pt-4">
                                {tattoo.title}
                            </h2>
                            <Separator />
                            <div className="px-4 pt-4">
                                <h3
                                    className=""
                                >Sobre la pieza: </h3>
                                <p className="">{tattoo.description}</p>
                            </div>

                            <div className="px-4 pt-4">
                                <h3>Estilo</h3>
                                <div>{tattoo.style}</div>
                            </div>
                            <div>
                                {/* tags separated by commas */}
                                <div className="px-4 pt-4">
                                    <div
                                        className="font-bold"
                                    >Tags: </div>
                                    <p className="">{
                                        (tattoo.tags.map((el) => (
                                            `#${el.tag.label.toLowerCase()}`
                                        ))).join(", ")
                                    }</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between p-4">

                                {
                                    <p> {
                                        age === 0 ? 'Publicado hoy' :

                                            age > 1 ? `Publicado hace ${age} días` :
                                                `Publicado ayer`
                                    } </p>
                                }
                                {
                                    tattoo.likes?.length > 0 && (
                                        <div className="flex flex-row items-center gap-1">
                                            {tattoo.likes?.length} likes
                                        </div>)


                                }
                            </div>

                        </div>
                        <ShareButtons url={`${hostname}/tatuajes/${tattoo.id}`} />
                        <div className="px-4 py-2">
                            <p>Artista:</p>
                            <ArtistSmallCard artist={tattoo.artistProfile} />
                        </div>
                    </div>
                </div>
            </div>


            <h2 className="mt-20">También te pueden gustar...</h2>
            <Separator className="my-3" />
            {
                (similarTattoos?.length > 0) &&
                <ListingGrid>
                    {
                        similarTattoos.map(
                            tattoo => (
                                <TattooCard data={tattoo} currentUser={currentUser} key={tattoo.id} />
                            )
                        )
                    }
                </ListingGrid>}
        </div>
    )
};

export default TattooDetailsPage;