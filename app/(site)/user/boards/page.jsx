import { getCurrentUser } from "@/services/db/getCurrentUser";
import Container from "@/components/container";
import Heading from "@/components/heading";
import EmptyState from "@/components/empty-states/empty-state";
import ListingGrid from "@/components/listings/listing-grid";
import BoardCard from "@/components/listings/board-card";
import { TattooService } from "@/services/db/TattooService";
export const dynamic = "force-dynamic";

export default async function BoardsPage({ searchParams }) {
  const currentUser = await getCurrentUser();

  const boards = currentUser?.boards;

  // add the first tattoo of each board to the board object as a promise to be resolved
  //TODO:  I am pretty sure there are better ways to do this...
  const boardsWithFirstTattoo = await Promise.all(
    boards.map(async (board) => {
      const boardTattoos = await TattooService.getByBoardId(board.id);
      if (boardTattoos.length < 1) return { ...board, firstTattoo: null };
      return { ...board, firstTattoo: boardTattoos[0].imageSrc };
    }),
  );

  if (!boards || boards.length < 1) {
    return (
      <Container>
        <EmptyState
          title="No has guardado aún ningún tablero"
          subtitle="Crea un tablero para guardar tus tatuajes favoritos"
          actionUrl={"/tatuajes"}
          actionLabel={"Ver tatuajes"}
        />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Heading
          title={"Tus tableros"}
          subtitle={
            "Guarda tus tatuajes en tableros y no los pierdas de vista!"
          }
        />
        <ListingGrid>
          {/* <BoardCard board={board} key={board.id} /> */}
          {boardsWithFirstTattoo.map((board) => (
            <BoardCard board={board} key={board.id} />
          ))}
        </ListingGrid>
      </Container>
    </>
  );
}
