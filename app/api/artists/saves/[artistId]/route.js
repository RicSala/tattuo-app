import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { UserService } from "@/services/db/UserService";

export async function POST(request, { params }) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { artistId } = params;

  if (!artistId || typeof artistId !== "string") {
    throw new Error("Invalid ID");
  }

  // add an entry to the collections SavedArtist
  const savedArtist = await UserService.saveArtist(currentUser.id, artistId);

  return NextResponse.json({ savedArtist }, { status: 201 });
}

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { artistId } = params;

  if (!artistId || typeof artistId !== "string") {
    throw new Error("Invalid ID");
  }

  // remove an entry from the collections SavedArtist
  const deletedArtist = await UserService.deleteSaveArtist(
    currentUser.id,
    artistId,
  );

  return NextResponse.json({ deletedArtist }, { status: 201 });
}
