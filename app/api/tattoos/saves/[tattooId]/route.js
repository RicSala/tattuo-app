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

  // add an entry to the collections SavedTattoo
  const savedTattoo = await UserService.saveTattoo(currentUser.id, tattooId);

  return NextResponse.json({ savedTattoo }, { status: 201 });
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
  const savedTattoo = await prisma.savedTattoo.deleteMany({
    where: {
      tattooId: tattooId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(savedTattoo);
}
