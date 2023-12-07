import prisma from "@/lib/prismadb";

export class StudioService {
  static async getPaginated(searchParams, skip = 0, take = undefined) {
    const query = this.#buildQuery(searchParams);
    const studios = await prisma.studio.findMany({
      where: query,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      skip,
      take,
    });
    return studios;
  }

  static async update(studioData) {
    const { id, ...data } = studioData;
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

  static #buildQuery(searchParams) {
    const { name, styles, city, freeSearch, unclaimed } = searchParams;

    //TODO: check this out!
    /**
     * @type {import('.prisma/client').Prisma.ArtistProfileWhereInput}
     */
    let query = {};

    const stylesArray = styles?.split(",").map((style) => style.trim());

    if (name) {
      query.name = {
        contains: name,
        mode: "insensitive",
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
            name: {
              contains: name,
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
