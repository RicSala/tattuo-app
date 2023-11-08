import prisma from "@/lib/prismadb";

// given a user id, it returns an array with the complete data of the saved tattoos
/**
 *
 * @param {String} userId
 * @returns
 */
export async function getSavedTattoosByUserId(userId) {
  /** @type {(import("@prisma/client").SavedTattoo & {tattoo: import("@prisma/client").Tattoo})[]} */
  const savedTattoos = await prisma.savedTattoo.findMany({
    where: {
      userId: userId,
    },
    include: {
      tattoo: true,
    },
  });

  const arraySavedTattoos = savedTattoos.map(
    (savedTattoo) => savedTattoo.tattoo,
  );

  return arraySavedTattoos;
}
