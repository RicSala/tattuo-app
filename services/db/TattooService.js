import { mapLabelsToIds } from "@/lib/getStyleList";
import prisma from "@/lib/prismadb";
import { TagService } from "./OthersService";

export class TattooService {
  static async getByBoardId(boardId) {
    const boardTattoos = await prisma.boardTattoo.findMany({
      where: {
        boardId,
      },
      include: {
        tattoo: true,
      },
    });
    const tattoosArray = boardTattoos.map((boardTattoo) => boardTattoo.tattoo);
    return tattoosArray;
  }

  static async getByArtistId(artistId) {
    const tattoos = await prisma.tattoo.findMany({
      where: {
        artistProfileId: artistId,
      },
    });
    if (!tattoos) {
      return null;
    }
    return tattoos;
  }

  static async getPaginated(searchParams, skip = 0, take = undefined) {
    const query = this.#buildQuery(searchParams);
    const tattoos = await prisma.tattoo.findMany({
      where: query,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip,
      take, // fetch 'take + 1' items, so we know if there are more items to fetch
    });
    return tattoos;
  }

  static async getById(
    id,
    {
      includeArtistProfile = true,
      includeLikes = true,
      includeStyle = true,
      includeTags = true,
    } = {},
  ) {
    const tattoo = await prisma.tattoo.findUnique({
      where: {
        id,
      },
      include: {
        artistProfile: includeArtistProfile,
        likes: includeLikes,
        styles: includeStyle,
        tags: {
          include: {
            tag: includeTags,
          },
        },
      },
    });

    return tattoo;
  }

  static async getSimilar(tattoo) {
    const similarTattoos = await prisma.tattoo.findMany({
      where: {
        OR: [
          {
            artistProfileId: {
              equals: tattoo.artistProfileId,
            },
            id: {
              not: tattoo.id,
            },
          },
        ],
      },
      include: {
        artistProfile: {
          select: {
            id: true,
            artisticName: true,
            // avatar: true
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                label: true,
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });
    return similarTattoos;
  }

  static async create({
    title,
    description,
    imageSrc,
    category,
    location,
    styles,
    bodyPart,
    artistProfile,
    tags,
  }) {
    console.log({ styles });

    let listing = await prisma.tattoo.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        location,
        styles: {
          connect: styles.map((style) => ({ id: style.id })),
        },
        bodyPart: {
          connect: { id: bodyPart.id },
        },
        artistProfile: {
          connect: { id: artistProfile.id },
        },
        tags: {
          create: tags.map((tag) => ({
            tag: { connect: { id: tag.id } },
          })),
        },
        searchText: this.#updateSearchTextIndex(title, description, tags),
      },
    });

    return listing;
  }

  static async update(oldData, updatedData) {
    const currentTagIds = oldData.tags.map((t) => t.tag.id);
    const updatedTagIds = updatedData.tags.map((t) => t.id);

    console.log({ oldData }, { updatedData });

    // Identify tags to be added and removed
    const tagsToAdd = updatedData.tags.filter(
      (tag) => !currentTagIds.includes(tag.id),
    );
    const tagsToRemove = oldData.tags.filter(
      (taggedTattoo) => !updatedTagIds.includes(taggedTattoo.tag.id),
    );

    const updatedSearchText = this.#updateSearchTextIndex(
      updatedData.title,
      updatedData.description,
      updatedData.tags,
    );

    // Build the Prisma update query
    const updateQuery = {
      where: {
        id: oldData.id,
      },
      data: {
        title: updatedData.title,
        description: updatedData.description,
        imageSrc: updatedData.imageSrc,
        category: updatedData.category,
        location: updatedData.location,
        searchText: updatedSearchText,
        // updatedData.styles is now an array! So this is not correct anymore
        // style: {
        //   connect: { id: updatedData.style.id },
        // },
        // Instead, we need to do:
        styles: {
          connect: updatedData.styles.map((style) => ({ id: style.id })),
        },
        bodyPart: {
          connect: { id: updatedData.bodyPart.id },
        },
        artistProfile: {
          connect: { id: updatedData.artistProfile.id },
        },
      },
    };

    // Add connect operations for tags to be added
    if (tagsToAdd.length > 0) {
      updateQuery.data.tags = {
        // This is not a "tag", this is a "TaggedTattoo"...
        create: tagsToAdd.map((tag) => ({
          // so for each tag in tagsToAdd we create a new "TaggedTattoo", not a new tag!
          tag: {
            // in that tagged tattoo, the tag property is the connections...
            connect: { id: tag.id }, // when the selected tag id
          },
        })),
      };
    }

    // Build the operations to execute in the transaction
    const operations = [
      prisma.tattoo.update(updateQuery),
      ...tagsToRemove.map((taggedTattoo) =>
        prisma.taggedTattoo.delete({
          where: {
            id: taggedTattoo.id, // is this ok? the tattoo remains pointint to a taggedTattoo that no longer exists?
          },
        }),
      ),
    ];
    // Execute the transaction
    try {
      const transactionResult = await prisma.$transaction(operations);
      return transactionResult[0];
    } catch (error) {
      console.log("ERROR - update() - ", error);
      return null;
    }
  }

  static async delete(tattooId) {
    await prisma.tattoo.delete({
      where: {
        id: tattooId,
      },
    });
  }
  //
  //
  // ###############
  // PRIVATE METHODS
  // ###############

  static #private(id) {
    return;
  }

  // Given a tattoo, it updates its "textIndex" property to combine the title, descripction and tags
  static #updateSearchTextIndex(title, description, tags) {
    const tagLabels = tags.map((tag) => tag.label);

    const textIndex = `${title} ${description} ${tagLabels.join(" ")}`;
    return textIndex;
  }

  static #buildQuery(searchParams) {
    const { userId, styles, bodyPart, freeSearch, contentSlug } = searchParams;

    // ### SEARCH FUNCTIONALITY ###
    // // we are building the query object for prisma

    //TODO: check this out!
    /**
     * @type {import('.prisma/client').Prisma.TattooWhereInput}
     */
    let query = {};

    // // conditionally add properties to the query object...
    const stylesArray = styles?.split(",").map((style) => style.trim());
    if (stylesArray && stylesArray.length > 0) {
      const styleIds = mapLabelsToIds(stylesArray);
      query.stylesIds = {
        hasSome: styleIds,
      };
    }

    const bodyPartsArray = bodyPart
      ?.split(",")
      .map((bodyPart) => bodyPart.trim());

    if (bodyPartsArray && bodyPartsArray.length > 0) {
      query.bodyPart = {
        label: {
          in: bodyPartsArray,
          mode: "insensitive",
        },
      };
    }

    // create a query that returns the tattoos that match the search in the title or description
    if (freeSearch) {
      query.searchText = {
        contains: freeSearch,
        mode: "insensitive",
      };
    }

    if (contentSlug) {
      query = {
        AND: [
          { ...query },
          {
            tags: {
              some: {
                tag: {
                  label: {
                    contains: contentSlug,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ],
      };
    }

    // console.log(JSON.stringify(query));

    return query;
  }
}
