import prisma from "@/lib/prismadb";


// given a user id, it returns an array with the complete data of the saved tattoos
export async function getSavedTattoosByUserId(userId) {

    const savedTattoos = await prisma.savedTattoo.findMany({
        where: {
            userId: userId
        },
        include: {
            tattoo: true
        }
    })

    const arraySavedTattoos = savedTattoos.map(savedTattoo => savedTattoo.tattoo)

    return arraySavedTattoos
}