// @ts-check
import * as MyTypes from '@/types'

import prisma from "@/lib/prismadb";
export const dynamic = "force-dynamic";



// given an artist id, the profile, including the artist user data

/**
 * 
 * @param {string} artistId 
 * @returns {Promise<MyTypes.ArtistProfile | null > }
 */
export async function getArtistById(artistId) {

    try {

        const artist = await prisma.artistProfile.findUnique({
            where: {
                id: artistId,
            },
            include: {
                user: true,
                likes: true,
                styles: true,
                city: true,
            }
        });

        if (!artist) {
            return null;
        }

        return artist

    }
    catch (error) {
        console.log("ERROR - getArtistById.js", error)
        return null;
    }
}
