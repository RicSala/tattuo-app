import prisma from "@/lib/prismadb";

export class UserService {
  static async settingsUpdate(userId, data) {
    prisma.settings.update({
      where: {
        userId: userId,
      },
      data,
    });
  }

  static async saveTattoo(userId, tattooId) {
    const savedTattoo = await prisma.savedTattoo.create({
      data: {
        tattoo: {
          // the object to connect
          connect: {
            id: tattooId, //they key to connect by
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return savedTattoo;
  }

  static async likeTattoo(userId, tattooId) {
    const likedTattoo = await prisma.likedTattoo.create({
      data: {
        tattoo: {
          // the object to connect
          connect: {
            id: tattooId, //they key to connect by
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return likedTattoo;
  }

  static async deleteLikeTattoo(userId, tattooId) {
    const likedTattoo = await prisma.likedTattoo.deleteMany({
      where: {
        tattooId: tattooId,
        userId: userId,
      },
    });

    return likedTattoo;
  }

  static async saveArtist(userId, artistId) {
    const savedArtist = await prisma.savedArtist.create({
      data: {
        artistProfile: {
          // the object to connect
          connect: {
            id: artistId, //they key to connect by
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return savedArtist;
  }

  static async deleteSaveArtist(userId, artistId) {
    const deletedArtist = await prisma.savedArtist.deleteMany({
      where: {
        artistProfileId: artistId,
        userId: userId,
      },
    });

    return deletedArtist;
  }

  static async likeArtist(userId, artistId) {
    const likedArtist = await prisma.likedArtist.create({
      data: {
        artistProfile: {
          // the object to connect
          connect: {
            id: artistId, //they key to connect by
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return likedArtist;
  }

  static async deleteLikeArtist(userId, artistId) {
    await prisma.likedArtist.deleteMany({
      where: {
        artistProfileId: artistId,
        userId: userId,
      },
    });
  }

  static async getSavedTattoosByUserId(userId) {
    /** @type {(import("@prisma/client").SavedTattoo & {tattoo: import("@prisma/client").Tattoo})[]} */
    const savedTattoos = await prisma.savedTattoo.findMany({
      where: {
        userId,
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

  static async getSavedArtistsByUserId(userId) {
    /** @type {(import("@prisma/client").SavedArtist & {artistProfile: import("@prisma/client").ArtistProfile})[]} }*/
    const savedArtists = await prisma.savedArtist.findMany({
      where: {
        userId: userId,
      },
      include: {
        artistProfile: true,
      },
    });
    const arraySavedArtists = savedArtists.map(
      (savedArtist) => savedArtist.artistProfile,
    );
    return arraySavedArtists;
  }

  //   TODO: pretty sure we are not using this
  static async getFavoriteTattooIds(user) {
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
  }

  static async getFavoriteArtistIds(user) {
    /** @type {import("@prisma/client").LikedArtist[]} */
    const favoriteIds = await prisma.likedArtist.findMany({
      where: {
        userId: user.id,
      },
      select: {
        artistProfileId: true,
      },
    });

    return favoriteIds.map((favoriteId) => favoriteId.artistProfileId);
  }

  //   TODO: pretty sure we are not using this
  static async getBoards(user) {
    const boards = await prisma.tattooBoard.findMany({
      where: {
        userId: user.id,
      },
      include: {
        tattoos: true,
      },
    });

    return boards;
  }

  static async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  static async register(
    name,
    email,
    hashedPassword = undefined,
    role = "CLIENT",
  ) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        confirmPassword: "", //TODO: not sure if we should store this
        role,
        settings: {
          create: {},
        },
      },
    });

    return user;
  }

  static async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  //
  //
  // ###############
  // PRIVATE METHODS
  // ###############
}
