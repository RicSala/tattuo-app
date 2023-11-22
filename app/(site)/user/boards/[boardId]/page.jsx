import { getCurrentUser } from "@/services/db/getCurrentUser";
import DeleteFromBoardButton from "@/components/delete-from-board-button";
import EmptyState from "@/components/empty-states/empty-state";
import Heading from "@/components/heading";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { BoardService } from "@/services/db/BoardService";

const TattooDetailsPage = async ({ params }) => {
  const currentUser = await getCurrentUser();
  const board = await BoardService.getBoardById(params.boardId);
  const tattoos = board.tattoos.map((boardTattoo) => boardTattoo.tattoo);

  if (!tattoos || tattoos.length === 0) {
    return <EmptyState title="No se han encontrado resultados" />;
  }
  return (
    <Container>
      <Heading title={`Tu tablero: ${board.title}`} />

      <ListingGrid>
        {tattoos.map((tattoo) => (
          <TattooCard
            key={tattoo.id}
            data={tattoo}
            listingType={"tattoos"}
            currentUser={currentUser}
            hasBoardAdder={false}
            likeable={false}
            actionLabel={"Eliminar de tablero"}
            actionId={tattoo.id}
            secondaryActionId={board.id}
          >
            <DeleteFromBoardButton tattooId={tattoo.id} boardId={board.id}>
              Eliminar de tablero
            </DeleteFromBoardButton>
          </TattooCard>
        ))}
      </ListingGrid>
    </Container>
  );
};

export default TattooDetailsPage;
