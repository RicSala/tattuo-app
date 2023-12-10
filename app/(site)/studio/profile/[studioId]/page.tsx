import { TattooService } from "@/services/db/TattooService";
import prisma from "@/lib/prismadb";
import { MapsProvider } from "@/providers/maps-provider";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import { getCities } from "@/lib/getCities";
import { StudioProfileClient } from "../../claim/[studioId]/(components)/studio-profile-form";
import { ClientWrapper } from "./clientWrapper";

export const dynamic = "force-dynamic";

const ProfilePage = async ({ params }: { params: { studioId: string } }) => {
  // const artist = await ArtistService.getById(currentUser.artistProfileId);

  // if (!artist) {
  //   <EmptyState
  //     title="No estás autorizado"
  //     subtitle="Si eres tatuador(a), por favor escríbenos para activar tu perfil"
  //   />;
  // }

  // const styles = await OthersService.getStyles();
  // const cities = getCities();

  const { studioId } = params;
  let isNew = false;
  if (studioId === "new") isNew = true;
  const currentUser = await getCurrentUser();

  let studio = undefined;
  // if the tattoo is not new, we get it from the database
  // otherwise we just pass an empty object
  if (!isNew)
    studio = await prisma.studio.findUnique({ where: { id: studioId } });
  const cities = getCities();

  return (
    <MapsProvider>
      <div className="mx-auto max-w-2xl">
        <ClientWrapper
          cities={cities}
          studio={studio}
          currentUser={currentUser}
        />
      </div>
    </MapsProvider>
  );
};
export default ProfilePage;
