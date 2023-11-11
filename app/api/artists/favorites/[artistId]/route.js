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

  // add an entry to the collections likedArtist
  const likedArtist = await UserService.likeArtist(currentUser.id, artistId);

  return NextResponse.json({ likedArtist }, { status: 201 });
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

  // remove an entry from the collections likedArtist
  const deletedArtist = await UserService.deleteLikeArtist(
    currentUser.id,
    artistId,
  );

  return NextResponse.json({ deletedArtist }, { status: 201 });
}
