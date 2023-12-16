import EmptyState from "@/components/empty-states/empty-state";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import { getCities } from "@/lib/getCities";
import { ArtistService } from "@/services/db/ArtistService";
import { OthersService } from "@/services/db/OthersService";
import { ProfilePageClient } from "./profile-page-client";

export const dynamic = "force-dynamic";

const ProfilePage = async ({}) => {
  const currentUser = await getCurrentUser();

  const artist = currentUser?.artistProfileId
    ? await ArtistService.getById(currentUser?.artistProfileId)
    : null;

  if (!artist) {
    return (
      <EmptyState
        title="No estás autorizado"
        subtitle="Si eres tatuador(a), por favor escríbenos para activar tu perfil"
      />
    );
  }

  const styles = await OthersService.getStyles();
  const cities = getCities();

  return (
    <div>
      <ProfilePageClient artist={artist} styles={styles} cities={cities} />;
    </div>
  );
};
export default ProfilePage;
