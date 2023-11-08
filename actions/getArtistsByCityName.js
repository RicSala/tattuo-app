import * as MyTypes from "@/types";

import prisma from "@/lib/prismadb";

// given an artist id, it returns an array of tattoos that the artist has created
/**
 *
 * @param {MyTypes.City["label"]} cityName
 * @returns {Promise<MyTypes.ArtistProfile[] | null >}
 */
export async function getArtistsByCityName(cityName) {
  try {
    const artists = await prisma.artistProfile.findMany({
      where: {
        city: {
          label: {
            equals: cityName,
            mode: "insensitive", // this makes the comparison case insensitive
          },
        },
      },
      // include: {
      //     city: true, // include city data in the response
      // },
    });

    return artists;
  } catch (error) {
    console.log("ERROR - getArtistByCityName", error);
    return null;
  }
}
