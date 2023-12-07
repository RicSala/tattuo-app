import { getCurrentUser } from "@/services/db/getCurrentUser";
import EmptyState from "@/components/empty-states/empty-state";
import Heading from "@/components/heading";
import ListingGrid from "@/components/listings/listing-grid";
import { Separator } from "@/components/ui/separator";
import { range } from "@/lib/utils";
import { StudioService } from "@/services/db/StudioService";
import StudioCard from "@/components/listings/studio-card";
export const dynamic = "force-dynamic";

const MyTattoosPage = async ({ params }) => {
  const currentUser = await getCurrentUser();

  const studios = await StudioService.getUserStudios(currentUser.id);

  if (studios.length < 1) {
    return (
      <>
        <EmptyState
          title="No gestionas ningún estudio"
          subtitle="Si tienes un estudio de tatuejes, puedes darlo de alta en TATTUO"
          actionLabel="Publicar estudio"
          actionUrl="/studio/profile/new"
          className={"mb-6"}
        />
        {/* <ListingGrid>
            {range(3).map((i) => (
              <FakeTattooCard key={i} />
            ))}
          </ListingGrid> */}
      </>
    );
  }

  return (
    <>
      <Heading
        title={"Tus estudios de tatuajes"}
        // subtitle={
        //   ""
        // }
        // url={"/artist/tatuajes/new"}
        // buttonLabel={"Nuevo Tatuaje"}
      />
      <Separator className="my-5" />

      <ListingGrid>
        {studios.map((studio) => (
          <StudioCard key={studio.id} studio={studio}>
            {/* TODO: improve style */}
            {/* <div className="mb-2 flex w-full flex-row justify-start gap-2">
              <DeleteTattooButton tattooId={tattoo.id}>
                Eliminar
              </DeleteTattooButton>

              <EditTattooButton tattooId={tattoo.id}>Editar</EditTattooButton>
            </div> */}
          </StudioCard>
        ))}
      </ListingGrid>
    </>
  );
};

export default MyTattoosPage;
