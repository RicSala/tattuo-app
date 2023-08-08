import prisma from "@/lib/prismadb";


export async function getArtists(searchParams, skip = 0, take = undefined) { // I would call the args "filters", because actually the function could without "searchParams" specifically

    try {

        const {
            userId,
            styles,
            city,
            freeSearch,
        } = searchParams;


        // ### SEARCH FUNCTIONALITY ###
        // // we are building the query object for prisma
        let query = {};

        // // conditionally add properties to the query object...

        const stylesArray = styles?.split(",").map(style => style.trim())

        if (stylesArray && stylesArray.length > 0) {
            // if there are styles, we want to show the artists that have at least one style whose label is in the styles array
            query.styles = { // find where styles array of the artist... (element to apply the condition to)
                some: { // ...contains at least one object (one style)... (condition to apply. This could be also ...?)
                    label: { // ...whose label... (property of the element to apply the condition to)
                        in: stylesArray // ...is in the styles array (values of the condition)
                    }
                }
            }
        }

        const citiesArray = city?.split(",").map(city => city.trim())

        if (city) {
            query.city = {
                label: {
                    in: citiesArray,
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
                        artisticName: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    },
                    {
                        bio: {
                            contains: freeSearch,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        }
        // ### END OF SEARCH FUNCTIONALITY ###

        const artists = await prisma.artistProfile.findMany({
            where: query,
            orderBy: [
                { createdAt: 'asc' },
                { id: 'asc' },
            ],
            skip,
            take: take, // fetch 'take + 1' items, so we know if there are more items to fetch
        });

        return artists;

    } catch (error) {
        throw new Error(error); // TODO: where does this error go?
    }
}