// @ts-check

import prisma from "@/lib/prismadb";


// given a user id, it returns an array with the complete data of the saved tattoos
/**
 * 
 * @param {String} userId 
 * @returns {Promise<import("@prisma/client").ArtistProfile[]>}
 */
export async function getSavedArtistsByUserId(userId) {

    /** @type {(import("@prisma/client").SavedArtist & {artistProfile: import("@prisma/client").ArtistProfile})[]} }*/
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