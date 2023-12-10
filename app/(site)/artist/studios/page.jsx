import { getCurrentUser } from "@/services/db/getCurrentUser";
import EmptyState from "@/components/empty-states/empty-state";
import Heading from "@/components/heading";
import ListingGrid from "@/components/listings/listing-grid";
import { Separator } from "@/components/ui/separator";
import { range } from "@/lib/utils";
import { StudioService } from "@/services/db/StudioService";
import StudioCard from "@/components/listings/studio-card";
import EditTattooButton from "@/components/edit-tattoo-button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Fragment } from "react";
export const dynamic = "force-dynamic";

const MyTattoosPage = async ({ params }) => {
  const currentUser = await getCurrentUser();

  const studios = await StudioService.getUserStudios(currentUser.id);

  if (studios.length < 1) {
    return (
      <>
        <EmptyState
          title="No gestionas ningún estudio"
          subtitle="Si tienes un estudio de tatuajes, puedes darlo de alta en TATTUO"
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
          <div key={studio.id} className="flex flex-col gap-4">
            <StudioCard studio={studio}>{/* TODO: improve style */}</StudioCard>
            <div className="mb-2 flex w-full flex-row justify-start gap-2 px-2">
              <Link
                href={`/studio/profile/${studio.id}`}
                className={buttonVariants({ variant: "default" })}
              >
                Editar
              </Link>
            </div>
          </div>
        ))}
      </ListingGrid>
    </>
  );
};

export default MyTattoosPage;
