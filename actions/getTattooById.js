import prisma from "@/lib/prismadb";


// given a tattoo id, it returns the tattoo completed data, including the artist profile
export async function getTattoosById(tattooId) {

    try {

        const tattoo = await prisma.tattoo.findUnique({
            where: {
                id: tattooId,
            },
            include: {
                artistProfile: true,
                likes: true,
                tags: {
                    select: {
                        tag: {
                            select: {
                                label: true
                            }
                        }
                    }
                }
            }
        });

        if (!tattoo) {
            return null;
        }

        return tattoo

    } catch (error) {
        console.log("ERROR - getTattoosById", error)
        return null;
    }
}