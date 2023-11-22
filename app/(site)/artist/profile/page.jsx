import EmptyState from "@/components/empty-states/empty-state";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import ProfilePageClient from "./profile-page-client";
import prisma from "@/lib/prismadb";
import { getCities } from "@/lib/getCities";
import { ArtistService } from "@/services/db/ArtistService";
import { OthersService } from "@/services/db/OthersService";

export const dynamic = "force-dynamic";

const ProfilePage = async (
  {
    // currentUser //REVIEW: why not passing current user to children through the layout?
  },
) => {
  const currentUser = await getCurrentUser();

  const artist = await ArtistService.getById(currentUser.artistProfileId);

  if (!artist) {
    <EmptyState
      title="No estás autorizado"
      subtitle="Si eres tatuador(a), por favor escríbenos para activar tu perfil"
    />;
  }

  const styles = await OthersService.getStyles();
  const cities = getCities();

  return <ProfilePageClient artist={artist} styles={styles} cities={cities} />;
};
export default ProfilePage;
