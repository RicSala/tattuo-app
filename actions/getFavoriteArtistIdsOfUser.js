import prisma from "@/lib/prismadb";

// given a user, it returns an array of tattoo ids that the user has saved as favorite
/**
 *
 * @param {import("@prisma/client").User} user
 * @returns {Promise<string[] | null>}
 */
export async function getFavoriteArtistIdsOfUser(user) {
  try {
    if (!user) {
      return null;
    }

    /** @type {import("@prisma/client").LikedArtist[]} */
    const favoriteIds = await prisma.likedArtist.findMany({
      where: {
        userId: user.id,
      },
      select: {
        artistProfileId: true,
      },
    });

    if (!favoriteIds) {
      return [];
    }

    return favoriteIds.map((favoriteId) => favoriteId.artistProfileId);
  } catch (error) {
    console.log("ERROR - getFavoriteArtistIdsOfUser", error);
    return [];
  }
}
