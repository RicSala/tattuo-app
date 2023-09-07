import prisma from "@/lib/prismadb";


export default async function getSimilarTattoos(tattoo) {

    const similarTattoos = await prisma.tattoo.findMany({
        where: {
            OR: [
                {
                    artistProfileId: {
                        equals: tattoo.artistProfileId
                    },
                    id: {
                        not: tattoo.id
                    }
                },
            ]

        }

        ,
        include: {
            artistProfile: {
                select: {
                    id: true,
                    artisticName: true,
                    // avatar: true
                }
            },
            tags: {
                select: {
                    tag: {
                        select: {
                            label: true
                        }
                    }
                }
            },
            likes: {
                select: {
                    userId: true
                }
            }
        }
    });

    return similarTattoos;
}
