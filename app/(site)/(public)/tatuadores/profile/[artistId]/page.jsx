import EmptyState from "@/components/empty-state";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getArtistById } from "@/actions/getArtistById";
import { getTattoosByArtistId } from "@/actions/getTattoosByArtistId";
import Heading from "@/components/heading";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";
import ArtistDetailsCard from "@/components/artist/artist-details-card";
import { cn } from "@/lib/utils";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({
    params
}) => {

    const { artistId } = params
    const artist = await getArtistById(artistId)

    console.log({ params })

    return {
        title: `Descubre a ${artist.artisticName} · Tatuador ${artist.city} especializado en ${artist.styles[0].label}`,
        description: `Descubre a ${artist.artisticName} · Tatuador ${artist.city} especializado en ${artist.styles[0].label}`,
    }
};


// export const metadata = {
//     title: 'hello',
//     description: 'hello',
// }

export default async function ArtistDetailsPage({ params }) {


    // const artist = await getArtistById(params.artistId);
    // const artistTattoos = await getTattoosByArtistId(params.artistId);
    // const currentUser = await getCurrentUser();
    // instead of awaiting in series, we can await in parallel by using Promise.all
    const artistPromise = getArtistById(params.artistId);
    const artistTattoosPromise = getTattoosByArtistId(params.artistId);
    const currentUserPromise = getCurrentUser();


    const [artist, artistTattoos, currentUser] = await Promise.all([
        artistPromise, artistTattoosPromise, currentUserPromise]);

    if (!artist) {
        return (
            <EmptyState title="No se han encontrado resultados" />
        )
    }

    const numberOfTattoos = artistTattoos.length;


    return (

        <main className="flex flex-row flex-wrap justify-center gap-4">

            <section className="">
                <ArtistDetailsCard artist={artist} currentUser={currentUser} />
            </section>

            <section className="flex-grow">
                <Container>
                    <Heading title={`Sus trabajos`} />
                    <Separator className="my-2" />
                    <div className={cn(`
                        grid
                        grid-cols-1
                        gap-8
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-2
                        xl:grid-cols-2
                        2xl:grid-cols-3
                        m-auto
                        `
                    )}
                    >                        {
                            artistTattoos.map((tattoo) => (
                                <TattooCard
                                    data={tattoo} currentUser={currentUser} key={tattoo.id} />
                            )
                            )}
                    </div>
                </Container>
            </section>

        </main>
    )
};