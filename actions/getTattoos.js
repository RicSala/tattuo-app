import prisma from "@/lib/prismadb";
import * as MyTypes from '@/types'


/**
 * 
 * @param {string} searchParams 
 * @param {number} skip 
 * @param {number} take 
 * @returns {Promise<MyTypes.Tattoo[]>
 */
export async function getTattoos(searchParams, skip = 0, take = undefined) {
    // chatgpt, write the whole function
    try {

        const {
            userId,
            style,
            bodyPart,
            freeSearch,
            contentSlug,
        } = searchParams;


        // ### SEARCH FUNCTIONALITY ###
        // // we are building the query object for prisma
        let query = {};

        // // conditionally add properties to the query object...

        const stylesArray = style?.split(",").map(style => style.trim())

        if (stylesArray && stylesArray.length > 0) {

            query.style = {
                label: {
                    in: stylesArray
                }
            }
        }

        const bodyPartsArray = bodyPart?.split(",").map(bodyPart => bodyPart.trim())

        if (bodyPartsArray && bodyPartsArray.length > 0) {
            query.bodyPart = {
                label: {
                    in: bodyPartsArray,
                    mode: "insensitive"
                }
            }
        }



        // create a query that returns the tattoos that match the search in the title or description
        if (freeSearch) {

            query = {
                ...query,
                OR: [
                    {
                        title: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    },
                    {
                        tags: {
                            some: {
                                tag: {
                                    label: {
                                        contains: freeSearch,
                                        mode: "insensitive"

                                    }
                                }
                            }

                        }
                    }
                ]
            }
        }

        if (contentSlug) {
            query = {
                AND: [{ ...query },
                {
                    tags: {
                        some: {
                            tag: {
                                label: {
                                    contains: contentSlug,
                                    mode: "insensitive"

                                }
                            }
                        }

                    }
                }]
            }
        }

        // ### END OF SEARCH FUNCTIONALITY ###

        const tattoos = await prisma.tattoo.findMany({
            where: query,
            orderBy: [
                { createdAt: 'asc' },
                { id: 'asc' },
            ],
            skip,
            take: take, // fetch 'take + 1' items, so we know if there are more items to fetch
        });


        return tattoos;

    } catch (error) {
        throw new Error(error); // TODO: where does this error go?
    }
} 