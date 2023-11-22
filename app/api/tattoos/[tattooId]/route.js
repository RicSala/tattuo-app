import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import { TattooService } from "@/services/db/TattooService";

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  if (currentUser.role !== "ARTIST") {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { tattooId } = params;

  if (!tattooId || typeof tattooId !== "string") {
    throw new Error("Invalid ID");
  }

  await TattooService.delete(tattooId);

  return NextResponse.json(
    { data: null, message: "Deleted tattoo", ok: "true", status: "200" },
    { status: 200 },
  );
}
