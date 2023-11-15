import { getCurrentUser } from "@/services/db/getCurrentUser";
import DeleteTattooButton from "@/components/delete-tattoo-button";
import EditTattooButton from "@/components/edit-tattoo-button";
import EmptyState from "@/components/empty-states/empty-state";
import Heading from "@/components/heading";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { range } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FakeTattooCard } from "./components/fake-tattoo-card";
import { TattooService } from "@/services/db/TattooService";
export const dynamic = "force-dynamic";

const MyTattoosPage = async ({ params }) => {
  const currentUser = await getCurrentUser();

  const tattoos = await TattooService.getByArtistId(
    currentUser.artistProfileId,
  );

  if (tattoos.length < 1) {
    return (
      <EmptyState
        title="No has publicado ningún tatuaje"
        subtitle="Publica tatuajes para que tus clientes puedan verlos"
        actionLabel="Publicar tatuaje"
        actionUrl="/artist/tatuajes/new"
      />
    );
  }

  return (
    <>
      <Heading
        title={"Tus tatuajes publicados"}
        subtitle={
          "Añade más tatuajes para que te vean más y conseguir nuevos clientes"
        }
        url={"/artist/tatuajes/new"}
        buttonLabel={"Nuevo Tatuaje"}
      />
      <Separator className="my-5" />

      <ListingGrid>
        {tattoos.map((tattoo) => (
          <TattooCard
            data={tattoo}
            currentUser={currentUser}
            key={tattoo.id}
            actionLabel={"Editar"}
            onAction={"Editar"}
            secondaryActionLabel={"Eliminar"}
            onSecondaryAction={"Eliminar"}
            actionId={tattoo.id}
            canLike={false}
            canSave={false}
            hasBoardAdder={false}
            likeable={false}
            TattooCard={true}
          >
            {/* TODO: improve style */}
            <div className="mb-2 flex w-full flex-row justify-start gap-2">
              <DeleteTattooButton tattooId={tattoo.id}>
                Eliminar
              </DeleteTattooButton>

              <EditTattooButton tattooId={tattoo.id}>Editar</EditTattooButton>
            </div>
          </TattooCard>
        ))}
        {tattoos.length < 3
          ? range(3 - tattoos.length).map((i) => <FakeTattooCard key={i} />)
          : ""}
      </ListingGrid>
    </>
  );
};

export default MyTattoosPage;
