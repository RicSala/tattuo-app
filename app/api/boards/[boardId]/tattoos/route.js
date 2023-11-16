import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { BoardService } from "@/services/db/BoardService";

export async function POST(req, { params }) {
  const boardId = params.boardId;

  try {
    const body = await req.json();

    const user = await getCurrentUser();

    const board = await BoardService.getById(boardId);

    if (!board) {
      console.log("Board does not exist");
      return NextResponse.json(
        { error: "Board does not exist" },
        { status: 400 },
      );
    }

    // check if the tattoo is already in the board
    const tattooAlreadyInBoard = await prisma.boardTattoo.findFirst({
      where: {
        boardId: boardId,
        tattooId: body.tattooId,
      },
    });

    if (tattooAlreadyInBoard) {
      console.log("Tattoo already in board");
      return NextResponse.json(
        { error: "El tatuaje ya estaba en el tablero" },
        { status: 400 },
      );
    }

    // Add the tattoo to the board
    console.log("Board found 🟩. Adding tattoo...");
    const updatedBoard = await BoardService.addTattooById(
      boardId,
      body.tattooId,
    );

    return NextResponse.json(updatedBoard);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  const boardId = params.boardId;

  // get the tattooId from the body

  try {
    const body = await req.json();
    const deletedBoardTattoo = await BoardService.deleteTattooById(
      boardId,
      body.tattooId,
    );
    return NextResponse.json(deletedBoardTattoo);
  } catch (error) {
    console.log(error, "DELETE TATTOO FROM BOARD_ERROR");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
