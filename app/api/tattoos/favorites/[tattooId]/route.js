import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { UserService } from "@/services/db/UserService";

export async function POST(request, { params }) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { tattooId } = params;

  if (!tattooId || typeof tattooId !== "string") {
    throw new Error("Invalid ID");
  }

  // add an entry to the collections likedTattoo
  const likedTattoo = await UserService.likeTattoo(currentUser.id, tattooId);

  return NextResponse.json({ likedTattoo }, { status: 201 });
}

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { tattooId } = params;

  if (!tattooId || typeof tattooId !== "string") {
    throw new Error("Invalid ID");
  }

  // remove an entry from the collections SavedTattoo
  const likedTattoo = await UserService.deleteLikeTattoo(
    currentUser.id,
    tattooId,
  );

  return NextResponse.json(likedTattoo);
}
