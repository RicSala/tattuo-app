import { getCurrentUser } from "@/actions/getCurrentUser";
import getSimilarTattoos from "@/actions/getSimilarTattoos";
import { getTattoosById } from "@/actions/getTattooById";
import ArtistSmallCard from "@/components/artist/artist-bio";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import ShareButtons from "@/components/share-buttons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

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

    if (!tattoo) {
        return (
            <div title="No se han encontrado resultados" />
        )
    }



    const age = Math.floor((new Date() - new Date(tattoo.createdAt)) / (1000 * 60 * 60 * 24));

    return (

        <div className="container">
            <div className="m-10 mx-auto max-w-screen-lg overflow-hidden rounded-xl border shadow-lg">
                <div className="flex flex-col overflow-hidden md:flex-row">

                    <div className="relative order-first ml-auto 
                    h-[40vh] w-full 
                    md:order-none md:h-[60vh] md:w-[60vh]

                    
                    
                    ">
                        <Image alt="tattoo" fill src={tattoo.imageSrc} loading="lazy" className="object-cover" />
                    </div>

                    <div className="flex w-full flex-col md:w-1/2">
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="px-4 pt-4">
                                    {/* <Heading title= */}

                                    {tattoo.title}

                                    {/* />  */}
                                </div>
                                <Separator />
                                <div className="px-4 pt-4">
                                    <div
                                        className="font-bold"
                                    >Sobre la pieza: </div>
                                    <p className="">{tattoo.description}</p>
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
                                <div className="p-4 flex flex-row justify-between">

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
                            <ShareButtons url={`http://localhost:3000/tatuajes/${tattoo.id}`} />
                            <div className="px-4 py-2">
                                <p>Artista:</p>
                                <ArtistSmallCard artist={tattoo.artistProfile} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <h2 className="mt-20 font-bold text-lg">También te pueden gustar...</h2>

            {
                (similarTattoos.length > 0) &&
                <ListingGrid>
                    {
                        similarTattoos.map(
                            tattoo => (
                                <TattooCard tattoo={tattoo} currentUser={currentUser} key={tattoo.id} />
                            )
                        )
                    }
                </ListingGrid>}






        </div>
    )
};

export default TattooDetailsPage;