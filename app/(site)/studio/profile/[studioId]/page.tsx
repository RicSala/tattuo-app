import prisma from "@/lib/prismadb";
import { MapsProvider } from "@/providers/maps-provider";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import { getCities } from "@/lib/getCities";
import { ClientWrapper } from "./clientWrapper";
import { WithProperty } from "@/types";
import { ArtistProfile, City, Invite, Studio } from "@prisma/client";
import { InviteComp, InviteForm, InvitesTable } from "./invites";

export type StudioWithCityInviteArtist = WithProperty<
  WithProperty<Studio, "city", City>,
  "Invite",
  WithProperty<Invite, "artist", ArtistProfile>[]
>;

export const dynamic = "force-dynamic";

const StudioProfilePage = async ({
  params,
}: {
  params: { studioId: string };
}) => {
  const { studioId } = params;
  const currentUser = await getCurrentUser();

  let studio: StudioWithCityInviteArtist = await prisma.studio.findUnique({
    where: { id: studioId },
    include: {
      city: true,
      Invite: {
        include: {
          artist: true,
        },
      },
    },
  });
  const cities = getCities();

  return (
    <MapsProvider>
      <div className="mx-auto max-w-2xl">
        <ClientWrapper
          cities={cities}
          studio={studio}
          currentUser={currentUser}
        />
        <InviteComp invites={studio.Invite} studioId={studioId} />
      </div>
    </MapsProvider>
  );
};
export default StudioProfilePage;
