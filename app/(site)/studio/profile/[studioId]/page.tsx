import { TattooService } from "@/services/db/TattooService";
import { StudioProfilePageClient } from "./studio-profile-page-client";
import prisma from "@/lib/prismadb";

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

  let tattoo = {};
  // if the tattoo is not new, we get it from the database
  // otherwise we just pass an empty object
  if (!isNew)
    tattoo = await prisma.studio.findUnique({ where: { id: studioId } });

  return <StudioProfilePageClient />;
};
export default ProfilePage;
