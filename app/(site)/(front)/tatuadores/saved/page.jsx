import { getCurrentUser } from "@/actions/getCurrentUser";
import { getSavedArtistsByUserId } from "@/actions/getSavedArtistByUserId";
import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import ArtistCard from "@/components/listings/artist-card";
import ListingGrid from "@/components/listings/listing-grid";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

const SavedTattoosPage = async ({ params }) => {


    const currentUser = await getCurrentUser()

    const artists = await getSavedArtistsByUserId(currentUser.id)

    if (artists.length < 1) {
        return (
            <EmptyState title="No tienes ningún(a) tatuador(a) guardad@"
                subtitle="Guarda tatuadorxs para inspirarte y poder verlos más tarde"
            />
        )
    }

    return (

        <>
            <Container>
                <Heading title="Tatuador@s guardad@s"
                    subtitle="Estos son l@s tatuador@s que has guardado" />
                <Separator className={"my-3"} />
                <ListingGrid>
                    {artists.map((artist) => {
                        return (
                            <ArtistCard key={artist.id} data={artist} currentUser={currentUser} />
                        )
                    })}
                </ListingGrid>
            </Container >

        </>
    )
};

export default SavedTattoosPage;