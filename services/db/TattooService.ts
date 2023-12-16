import { mapLabelsToIds } from "@/lib/getStyleList";
import prisma from "@/lib/prismadb";
import {
    ArtistProfile,
    BodyPart,
    Prisma,
    Style,
    Tag,
    Tattoo,
} from "@prisma/client";
import {
    TTattooWDTagsWStylesWBodyPartWArtistProfile,
    WithProperty,
} from "@/types";
import {
    TTattooUpdateForm,
    tattooFormSchema,
} from "@/app/(site)/artist/tatuajes/[tattooId]/TattooEditPageClient";
// import { imageToTattoo } from "@/app/api/superadmin/tattoo-processing/route";
import { z } from "zod";
import { aiClient } from "@/lib/aiClient";

export class TattooService {
    static async getByBoardId(boardId: string) {
        const boardTattoos = await prisma.boardTattoo.findMany({
            where: {
                boardId,
            },
            include: {
                tattoo: true,
            },
        });
        const tattoosArray = boardTattoos.map(
            (boardTattoo) => boardTattoo.tattoo,
        );
        return tattoosArray;
    }

    //   TODO: This is pretty hacky, we should use a better approach
    static async getByArtistId(artistId = "f55c8b9893caf3bb32fc1b85") {
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

    static async deleteById(tattooId: string) {
        await prisma.tattoo.delete({
            where: {
                id: tattooId,
            },
        });
    }

    static async imageUrlToTattoo(
        imageSrc: string,
        p: any,
    ): Promise<z.infer<typeof tattooFormSchema>> {
        const prompt = `${p.context} ${p.options} ${p.promptExamples} ${p.promptRequest}`;
        console.log("prompt", prompt);
        console.log("Analyzing tattoo image...");
        console.log("imageSrc:: ", imageSrc);
        const response = await aiClient.chat.completions.create({
            max_tokens: 2000,
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageSrc,
                                detail: "low",
                            },
                        },
                    ],
                },
            ],
        });

        console.log("Formatting response...");

        const imageDescription = response.choices[0];
        const descriptionObject = JSON.parse(imageDescription.message.content);
        // Find the db body part of the body part in descriptionObject.bodyParts by matching the label
        const dbBodyPart = await prisma.bodyPart.findFirst({
            where: {
                label: descriptionObject.bodyPart.label,
            },
        });

        // Find the db styles of the styles in descriptionObject.styles array by matching the label
        const dbStyles = await prisma.style.findMany({
            where: {
                label: {
                    in: descriptionObject.styles.map(
                        (style: Style) => style.label,
                    ),
                },
            },
        });

        //   For the tags, we need to create them if they don't exist, or add them to the tattoo if they exist
        const dbTags = await Promise.all(
            descriptionObject.tags.map(async (tag: string) => {
                const dbTag = await prisma.tag.findFirst({
                    where: {
                        label: tag,
                    },
                });
                if (dbTag) {
                    return dbTag;
                } else {
                    const newTag = await prisma.tag.create({
                        data: {
                            label: tag,
                            value: tag,
                        },
                    });
                    return newTag;
                }
            }),
        );

        descriptionObject.bodyPart = dbBodyPart;
        descriptionObject.styles = dbStyles;
        descriptionObject.tags = dbTags;
        descriptionObject.imageSrc = imageSrc;

        console.log("PARSED", { descriptionObject });
        return descriptionObject;
    }

    static async getPaginated(
        searchParams: SearchParams,
        skip = 0,
        take: number | undefined = undefined,
    ) {
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
        id: string,
        {
            includeArtistProfile = true,
            includeLikes = true,
            includeStyle = true,
            includeTags = true,
            includeBodyPart = true,
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
                bodyPart: includeBodyPart,
                tags: {
                    include: {
                        tag: includeTags,
                    },
                },
            },
        });

        return tattoo;
    }

    static async getSimilar(tattoo: Tattoo) {
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
        styles,
        bodyPart,
        artistProfile,
        tags,
    }: {
        title?: string;
        description?: string;
        imageSrc?: string;
        styles?: Pick<Style, "id" | "label" | "value">[];
        bodyPart?: BodyPart;
        artistProfile?: ArtistProfile;
        tags: Tag[];
    }) {
        let data: Prisma.TattooCreateInput = {
            title,
            description,
            imageSrc,
            styles: {
                connect: styles.map((style) => ({ id: style.id })),
            },
            bodyPart: {
                connect: { id: bodyPart.id },
            },
            tags: {
                create: tags.map((tag) => ({
                    tag: { connect: { id: tag.id } },
                })),
            },
            searchText: this.#updateSearchTextIndex(title, description, tags),
        };

        if (artistProfile) {
            data.artistProfile = { connect: { id: artistProfile.id } };
        }

        console.log("data: ", data);

        let listing = await prisma.tattoo.create({
            data,
        });

        return listing;
    }

    static async updateById(
        tattooId: string,
        updatedData: z.infer<typeof tattooFormSchema>,
    ) {
        console.log("Updating tatoo...");
        console.log("old tattoo id", tattooId);
        console.log("updatedData: ", updatedData);
        const currentTattoo = await this.getById(tattooId, {
            includeArtistProfile: false,
            includeBodyPart: false,
            includeStyle: false,
            includeTags: true,
        });

        if (!currentTattoo) {
            return null;
        }
        console.log("currentTattoo from function updatebyid ", currentTattoo);

        let updadatedTattoot = await this.update(
            currentTattoo,
            updatedData as WithProperty<
                TTattooUpdateForm,
                "artistProfile",
                ArtistProfile
            >,
        );

        return updadatedTattoot;
    }

    static async update(
        oldData: TTattooWDTagsWStylesWBodyPartWArtistProfile,
        updatedData: WithProperty<
            TTattooUpdateForm,
            "artistProfile",
            ArtistProfile
        >,
    ) {
        console.log("starting update function...");
        console.log("currentTagIds: ", oldData.tags);
        // We are creating an array of the ids of the tags that the tattoo currently has
        const currentTagIds = oldData.tags.map((t) => t.tag.id);
        // now with the new tags
        console.log("updatedTagIds: ");
        const updatedTagIds = updatedData.tags.map((t) => t.id);

        console.log("Tags to add...", updatedData.tags);
        // Identify tags to be added and removed
        // Are in the updatedData but not in the oldData -> to create
        const tagsToAdd = updatedData.tags.filter(
            (tag) => !currentTagIds.includes(tag.id),
        );
        // Are in the oldData but not in the updatedData -> to delete
        console.log("Tags to delete...");
        const tagsToRemove = oldData.tags.filter(
            (taggedTattoo) => !updatedTagIds.includes(taggedTattoo.tag.id),
        );

        console.log("Updating search terms...");
        const updatedSearchText = this.#updateSearchTextIndex(
            updatedData.title,
            updatedData.description,
            updatedData.tags,
        );

        console.log("Building update query...");
        console.log("oldData.id: ", oldData.id);
        console.log(
            "stylesIds: ",
            updatedData.styles.map((style) => style.id),
        );
        console.log("bodypartId: ", updatedData.bodyPart.id);

        // Build the Prisma update query
        const updateQuery: {
            where: Prisma.TattooWhereUniqueInput;
            data: Prisma.TattooUpdateInput;
        } = {
            where: {
                id: oldData.id,
            },
            data: {
                title: updatedData.title,
                description: updatedData.description,
                imageSrc: updatedData.imageSrc,
                searchText: updatedSearchText,
                styles: {
                    connect: updatedData.styles.map((style) => ({
                        id: style.id,
                    })),
                },
                bodyPart: {
                    connect: { id: updatedData.bodyPart.id },
                },
                tags: {},
            },
        };
        console.log("updatedData.artistProfile:", updatedData?.artistProfile);
        if (updatedData.artistProfile) {
            updateQuery.data.artistProfile = {
                connect: { id: updatedData.artistProfile.id },
            };
        }

        console.log("Adding tags to update query...");
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

        console.log("Building transaction...");
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
            console.log("Executing transaction...");
            const transactionResult = await prisma.$transaction(operations);
            return transactionResult[0];
        } catch (error) {
            console.log("ERROR - update() - ", error);
            return null;
        }
    }

    static async delete(tattooId: string) {
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

    static #private(id: string) {
        return;
    }

    // Given a tattoo, it updates its "textIndex" property to combine the title, descripction and tags
    static #updateSearchTextIndex(
        title: string,
        description: string,
        tags: Tag[],
    ) {
        const tagLabels = tags.map((tag) => tag.label);

        const textIndex = `${title} ${description} ${tagLabels.join(" ")}`;
        return textIndex;
    }

    static #buildQuery(searchParams: SearchParams) {
        const { userId, styles, bodyPart, freeSearch, contentSlug } =
            searchParams;

        // ### SEARCH FUNCTIONALITY ###
        // // we are building the query object for prisma

        //TODO: check this out!
        // /**
        //  * @type {import('.prisma/client').Prisma.TattooWhereInput}
        //  */
        let query: Prisma.TattooWhereInput = {};

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

type SearchParams = {
    userId?: string;
    styles?: string;
    bodyPart?: string;
    freeSearch?: string;
    contentSlug?: string;
};
