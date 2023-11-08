import prisma from "@/lib/prismadb";

// given a user, it returns an array of tattoo ids that the user has saved as favorite
/**
 *
 * @param {import("@prisma/client").User} user
 * @return {Promise<String[] | null> }
 */
export async function getFavoriteTattooIdsOfUser(user) {
  try {
    if (!user) {
      return null;
    }

    /** @type {import("@prisma/client").LikedTattoo[]} */
    const favoriteIds = await prisma.likedTattoo.findMany({
      where: {
        userId: user.id,
      },
      select: {
        tattooId: true,
      },
    });

    if (!favoriteIds) {
      return [];
    }

    return favoriteIds.map((favoriteId) => favoriteId.tattooId);
  } catch (error) {
    return [];
  }
}
