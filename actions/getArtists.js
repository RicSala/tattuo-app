import * as MyTypes from "@/types";

import prisma from "@/lib/prismadb";

/**
 *
 * @param {{ userId: string, styles: string, city: string, freeSearch: string, artisticName:string, isClaimed:boolean }} searchParams
 * @param {number} skip
 * @param {number | undefined} take
 * @param {boolean} onlyCompleteProfiles
 * @returns {Promise<MyTypes.ArtistProfile[]>}
 */
export async function getArtists(
  searchParams,
  skip = 0,
  take = undefined,
  onlyCompleteProfiles = true,
  onlyProfilesWithEnoughtTattoos = true,
) {
  // I would call the args "filters", because actually the function could without "searchParams" specifically

  try {
    const { userId, styles, city, freeSearch, artisticName, unclaimed } =
      searchParams;

    console.log({ unclaimed });

    //TODO: check this out!
    /**
     * @type {import('.prisma/client').Prisma.ArtistProfileWhereInput}
     */
    let query = {};

    const stylesArray = styles?.split(",").map((style) => style.trim());

    if (stylesArray && stylesArray.length > 0) {
      // if there are styles, we want to show the artists that have at least one style whose label is in the styles array
      query.styles = {
        // find where styles array of the artist... (element to apply the condition to)
        some: {
          // ...contains at least one object (one style)... (condition to apply. This could be also ...?)
          label: {
            // ...whose label... (property of the element to apply the condition to)
            in: stylesArray, // ...is in the styles array (values of the condition)
          },
        },
      };
    }

    if (city) {
      query.city = {
        label: {
          contains: city,
          mode: "insensitive",
        },
      };
    }

    // create a query that returns the tattoos that match the search in the title or description
    if (freeSearch) {
      query = {
        ...query,
        OR: [
          {
            artisticName: {
              contains: freeSearch,
              mode: "insensitive",
            },
          },
          {
            bio: {
              contains: freeSearch,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    // if artisticName exists, returns the artist whose artistic name contains the substring in artisticName variable
    if (artisticName) {
      query = {
        ...query,
        artisticName: {
          contains: artisticName,
          mode: "insensitive",
        },
      };
    }

    // if isClaimed is exists and is equal to false, only return those that has isClaimed false
    if (unclaimed) {
      query = {
        ...query,
        // and it has not user
        user: null,
      };
    }
    if (onlyCompleteProfiles) {
      query = {
        ...query,
        isComplete: onlyCompleteProfiles,
      };
    }

    if (onlyProfilesWithEnoughtTattoos) {
      query = {
        ...query,
        // only artist that has at least 3 tattoos
      };
    }

    const artists = await prisma.artistProfile.findMany({
      include: {
        _count: {
          select: { tattoos: true },
        },
      },
      where: query,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      skip,
      take: take, // fetch 'take + 1' items, so we know if there are more items to fetch
    });

    return artists;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(message); // TODO: where does this error go?
  }
}
