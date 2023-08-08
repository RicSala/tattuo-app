import prisma from "@/lib/prismadb";


export default async function getSimilarTattoos(tattoo) { // I would call the args "filters", because actually the function could without "searchParams" specifically

    try {

        // get tattoos that have same style OR are from the same artist
        const similarTattoos = await prisma.tattoo.findMany({
            where: {
                OR: [
                    {
                        style: tattoo.style
                    },
                    {
                        artistProfileId: tattoo.artistProfileId
                    }
                ]
            }
        });

        return similarTattoos;

    } catch (error) {
        console.log("ERROR - getSimilarTattoos", error)
        return null;
    }
}
