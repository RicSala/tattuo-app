import * as MyTypes from "@/types";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../lib/prismadb";

/**
 *
 * @returns {Promise<{artistProfile: MyTypes.ArtistProfile} | { errorResponse: NextResponse<{ error: string }> }>}
 */
async function getArtistProfile() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      errorResponse: NextResponse.json(
        { error: "Not logged in" },
        { status: 401 },
      ),
    };
  }

  if (currentUser.role !== "ARTIST") {
    return {
      errorResponse: NextResponse.json(
        { error: "Not authorized" },
        { status: 401 },
      ),
    };
  }

  const artistProfile = await prisma.artistProfile.findUnique({
    where: {
      id: currentUser.artistProfileId,
    },
  });

  // I'm assuming here you'd want to throw an error if the profile wasn't found
  if (!artistProfile) {
    return {
      errorResponse: NextResponse.json(
        { error: "Profile not found" },
        { status: 404 },
      ),
    };
  }

  // if everything is good, return the user and artist profile
  return { artistProfile };
}

export default getArtistProfile;
