import { withTryCatch } from "@/errors/error-handlerss";
import { mapLabelsToIds } from "@/lib/getStyleList";
import prisma from "@/lib/prismadb";
import { isProfileComplete } from "@/lib/utils";

export class ArtistService {
  static async getById(id) {
    const artist = await prisma.artistProfile.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        likes: true,
        styles: true,
        city: true,
        tattoos: true,
      },
    });
    return artist;
  }

  static async update(oldProfile, updatedInfo) {
    const styleIds = updatedInfo.styles.map((style) => {
      return style.id;
    });

    // delete the property "city" of the updatedInfo object
    delete updatedInfo.styles;
    const cityId = updatedInfo.city.id;
    delete updatedInfo.city;
    updatedInfo.minWorkPrice = parseInt(updatedInfo.minWorkPrice);
    updatedInfo.pricePerHour = parseInt(updatedInfo.pricePerHour);
    updatedInfo.pricePerSession = parseInt(updatedInfo.pricePerSession);
    updatedInfo.socials = {
      set: [
        { network: "facebook", profile: updatedInfo.facebook },
        { network: "instagram", profile: updatedInfo.instagram },
        { network: "tiktok", profile: updatedInfo.tiktok },
        { network: "twitter", profile: updatedInfo.twitter },
      ],
    };

    // TODO: if profile is complete, set isComplete to true
    if (true) {
      updatedInfo.isComplete = true;
    }

    const updatedProfile = await prisma.artistProfile.update({
      where: {
        id: oldProfile.id,
      },
      data: {
        ...updatedInfo,
        city: { connect: { id: cityId } },
        styles: {
          set: [], // clear existing relations
          connect: styleIds.map((styleId) => ({ id: styleId })), // establish new relations
        },
      },
    });

    return updatedProfile;
  }

  /**
   * @param {{ userId: string, styles: string, city: string, freeSearch: string, artisticName:string, isClaimed:boolean }} searchParams
   * @param {number} skip
   * @param {number | undefined} take
   * @param {boolean} onlyCompleteProfiles
   * @returns {Promise<MyTypes.ArtistProfile[]>}
   */
  static async getPaginated(
    searchParams,
    skip = 0,
    take = undefined,
    onlyCompleteProfiles = true,
    onlyProfilesWithEnoughtTattoos = true,
  ) {
    const query = this.#buildQuery(
      searchParams,
      onlyCompleteProfiles,
      onlyProfilesWithEnoughtTattoos,
    );
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
  }

  //
  //
  // ###############
  // PRIVATE METHODS
  // ###############

  static #buildQuery(
    searchParams,
    onlyCompleteProfiles,
    onlyProfilesWithEnoughtTattoos,
  ) {
    const { userId, styles, city, freeSearch, artisticName, unclaimed } =
      searchParams;

    //TODO: check this out!
    /**
     * @type {import('.prisma/client').Prisma.ArtistProfileWhereInput}
     */
    let query = {};

    const stylesArray = styles?.split(",").map((style) => style.trim());

    if (stylesArray && stylesArray.length > 0) {
      const styleIds = mapLabelsToIds(stylesArray);
      query.stylesIds = {
        hasSome: styleIds,
      };
    }

    // REVIEW: Why does get the style id take sooooo much time???
    // if (stylesArray && stylesArray.length > 0) {
    //   // if there are styles, we want to show the artists that have at least one style whose label is in the styles array
    //   query.styles = {
    //     // find where styles array of the artist... (element to apply the condition to)
    //     some: {
    //       // ...contains at least one object (one style)... (condition to apply. This could be also ...?)
    //       label: {
    //         // ...whose label... (property of the element to apply the condition to)
    //         in: stylesArray, // ...is in the styles array (values of the condition)
    //       },
    //     },
    //   };
    // }

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

    return query;
  }
}
