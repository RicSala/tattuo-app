import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { ArtistService } from "@/services/db/ArtistService";

export async function PUT(request) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  if (currentUser.role !== "ARTIST") {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  // search the artistId of the current user
  const artistProfile = await ArtistService.getById(
    currentUser.artistProfileId,
  );

  // check that the user that is trying to edit the artist profile is the owner of the artist profile
  if (artistProfile.userId !== currentUser.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await request.json();

  const updatedInfo = { ...body };

  const updatedArtistProfile = await ArtistService.update(
    artistProfile,
    updatedInfo,
  );

  return NextResponse.json(updatedArtistProfile);
}
