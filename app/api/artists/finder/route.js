import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { CityService } from "@/services/db/CityService";
import { ArtistService } from "@/services/db/ArtistService";

export async function POST(request, { params }) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const profileMatches = await getMatches(currentUser, body);

  return NextResponse.json(profileMatches);
}

const getMatches = async (currentUser, body) => {
  const { styles, address } = body;

  try {
    const city = await CityService.getByLabel(address.label);

    if (!city) {
      console.log(`No city found with label: ${address}`);
      return;
    }

    const matchedArtists = await ArtistService.getArtists({
      where: {
        cityId: city.id,
      },
      include: {
        styles: true,
        city: true,
      },
      take: 5,
    });

    return matchedArtists;
  } catch (error) {
    console.error("Error querying artists:", error);
  }
};
