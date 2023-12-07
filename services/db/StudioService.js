import { mapLabelsToIds } from "@/lib/getStyleList";
import prisma from "@/lib/prismadb";

export class StudioService {
  static async getPaginated(
    searchParams,
    skip = 0,
    take = undefined,
    include = {},
  ) {
    const query = this.#buildQuery(searchParams);
    const studios = await prisma.studio.findMany({
      where: query,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      include,
      skip,
      take,
    });
    return studios;
  }

  static async update(studioData) {
    const { id, ...data } = studioData;
    console.log({ data });
    const studio = await prisma.studio.update({
      where: { id },
      data,
    });
    return studio;
  }

  static async create(studioData) {
    const studio = await prisma.studio.create({
      data: studioData,
    });
    return studio;
  }

  static async delete(id) {
    const studio = await prisma.studio.delete({
      where: { id },
    });
    return studio;
  }

  static async getUserStudios(userId) {
    const studios = await prisma.studio.findMany({
      where: { userId },
    });
    return studios;
  }

  static #buildQuery(searchParams) {
    const { name, styles, city, freeSearch, unclaimed } = searchParams;

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

    if (name) {
      query.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    if (city) {
      query.city = {
        label: {
          equals: city,
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
            name: {
              contains: freeSearch,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: freeSearch,
              mode: "insensitive",
            },
          },
        ],
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

    return query;
  }
}
