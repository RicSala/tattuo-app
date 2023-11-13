import { getCurrentUser } from "@/services/db/getCurrentUser";
import { NextResponse } from "next/server";
import { BoardService } from "@/services/db/BoardService";

export async function DELETE(req, { params }) {
  const { boardId } = params;
  const deletedBoard = await BoardService.deleteById(boardId);
  return NextResponse.json({ message: "ok" }, { status: 200 });
}
