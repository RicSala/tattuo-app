import EmptyState from "@/components/empty-state";
// import ProfilePageClient from "./profile-page-client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getArtistById } from "@/actions/getArtistById";
import ProfilePageClientCopy from "./profile-page-client";
import prisma from "@/lib/prismadb";
import { getCities } from "@/lib/getCities";

export const dynamic = "force-dynamic";


const ProfilePage = async ({
    // currentUser //REVIEW: why not passing current user to children through the layout?
}) => {

    const currentUser = await getCurrentUser()


    // REVIEW: We should do this with the middleware, but I need a way to diff between client and artist
    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate"
                subtitle="o regístrate si aún no eres parte de TATTUO"
            />
        )
    }

    const artist = await getArtistById(currentUser.artistProfileId);

    if (!artist) {
        <EmptyState title="No estás autorizado"
            subtitle="Si eres tatuador(a), por favor escríbenos para activar tu perfil"
        />
    }

    const styles = await prisma.style.findMany()
    const cities = getCities()



    return (
        <>
            <ProfilePageClientCopy artist={artist} styles={styles} cities={cities} />
        </>

    )
};
export default ProfilePage;