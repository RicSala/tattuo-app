import { TattooService } from "@/services/db/TattooService";
import { StudioClaimPageClient } from "./page-client";
import prisma from "@/lib/prismadb";
import { MapsProvider } from "@/providers/maps-provider";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import { getCities } from "@/lib/getCities";
import { City, Studio } from "@prisma/client";

export const dynamic = "force-dynamic";

const ProfilePage = async ({ params }: { params: { studioId: string } }) => {
    const { studioId } = params;
    let isNew = false;
    if (studioId === "new") isNew = true;
    const currentUser = await getCurrentUser();

    let studio: (Studio & { city: City | undefined | null }) | null = null;
    // if the tattoo is not new, we get it from the database
    // otherwise we just pass an empty object
    if (!isNew)
        studio = await prisma.studio.findUnique({
            where: { id: studioId },
            include: { city: true },
        });
    const cities = getCities();

    return (
        <MapsProvider>
            <div className="mx-auto max-w-2xl">
                <StudioClaimPageClient
                    studio={studio}
                    currentUser={currentUser}
                    cities={cities}
                />
            </div>
        </MapsProvider>
    );
};
export default ProfilePage;
