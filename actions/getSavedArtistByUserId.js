import prisma from "@/lib/prismadb";


// given a user id, it returns an array with the complete data of the saved tattoos
export async function getSavedArtistsByUserId(userId) {

    const savedArtists = await prisma.savedArtist.findMany({
        where: {
            userId: userId
        },
        include: {
            artistProfile: true
        }
    })

    const arraySavedArtists = savedArtists.map(savedArtist => savedArtist.artistProfile)

    return arraySavedArtists
}