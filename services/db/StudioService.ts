import { mapLabelsToIds } from "@/lib/getStyleList";
import prisma from "@/lib/prismadb";
import { slugify } from "@/lib/utils";
import { WithProperty, inviteFormData, searchParams } from "@/types";
import { City, Prisma, Studio } from "@prisma/client";

export class StudioService {
  static async getPaginated(
    searchParams: searchParams,
    skip = 0,
    take: number | undefined = undefined,
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

  static async update(
    studioData: WithProperty<
      Studio,
      "city",
      Pick<City, "id" | "label" | "value">
    >,
  ) {
    // REVIEW: This is another easy way to omit properties from an object
    const { id, userId, cityId, ...data } = studioData;
    console.log({ data });
    const studio = await prisma.studio.update({
      where: { id },
      data: {
        ...data,
        user: userId ? { connect: { id: userId } } : undefined,
        city: { connect: { id: data.city.id } },
      },
    });
    return studio;
  }

  static async create(
    studioData: WithProperty<
      Studio,
      "city",
      Pick<City, "id" | "label" | "value">
    >,
  ) {
    // delete the id from the data
    console.log({ studioData });
    delete studioData.id;
    const userId = studioData.userId;
    const cityId = studioData.city.id;
    // delete cityId from the data
    delete studioData.cityId;
    // generate a random googleUrl
    studioData.googlePlaceUrl = `RANDOM - ${Math.random()}`;
    delete studioData.userId;
    delete studioData.cityId;

    // create the slug
    // const formattedData = studioData as Omit<Studio, "cityId">;
    // omit the cityId from the
    // FIXME: You can fix this by using omit utility type to omit both cityId and userId
    const formattedData = studioData as Omit<Omit<Studio, "cityId">, "userId">;

    studioData.slug = slugify(studioData.name);
    const studio = await prisma.studio.create({
      data: {
        ...formattedData,
        user: userId ? { connect: { id: userId } } : undefined,
        city: { connect: { id: cityId } },
      },
    });
    return studio;
  }

  static async delete(id: string) {
    const studio = await prisma.studio.delete({
      where: { id },
    });
    return studio;
  }

  static async getUserStudios(userId: string) {
    const studios = await prisma.studio.findMany({
      where: { userId },
    });
    return studios;
  }

  static async invite({ studioId, invites }: inviteFormData) {
    console.log("inviting artists...");
    console.log({ studioId, invites });
    for (let i = 0; i < invites.length; i++) {
      // If artist.id = "email", next iteration
      const invite = invites[i];
      const id = invite.id;
      if (id === "email") continue;
      await prisma.invite.upsert({
        // data: {
        //   artistId: artist.id,
        //   studioId,
        // },
        where: {
          studioId_artistId: {
            artistId: invite.id,
            studioId,
          },
        },
        update: {},
        create: {
          artistId: invite.id,
          studioId,
        },
      });
    }
    return;
  }

  static #buildQuery(searchParams: searchParams) {
    const { name, styles, city, freeSearch, unclaimed } = searchParams;

    //TODO: check this out!
    /**
     * @type {import('.prisma/client').Prisma.StudioWhereInput}
     */

    let query: Prisma.StudioWhereInput = {};

    const stylesArray = styles?.split(",").map((style) => style.trim());

    // REVIEW: Studio does not have its own styles, it has artists that have styles
    // if (stylesArray && stylesArray.length > 0) {
    //   const styleIds = mapLabelsToIds(stylesArray);
    //   query.stylesIds = {
    //     hasSome: styleIds,
    //   };
    // }

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
