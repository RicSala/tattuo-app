import prisma from "@/lib/prismadb";

export class BoardService {
  static async getById(boardId) {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
      },
    });
    return board;
  }

  static async addTattooById(boardId, tattooId) {
    const board = prisma.boardTattoo.create({
      data: {
        board: {
          connect: {
            id: boardId,
          },
        },
        tattoo: {
          connect: {
            id: tattooId,
          },
        },
      },
    });

    return board;
  }

  static async deleteTattooById(boardId, tattooId) {
    prisma.boardTattoo.delete({
      where: {
        boardId_tattooId: {
          boardId,
          tattooId,
        },
      },
    });
  }

  static async getByTitleAndUserId(title, userId) {
    const board = await prisma.board.findFirst({
      where: { title, userId },
    });
    return board;
  }

  static async create({ title, userId }) {
    await prisma.board.create({
      data: {
        title,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  static async getByUserId(userId, { includeTattoos = false }) {
    prisma.board.findMany({
      where: {
        userId: userId,
      },
      include: {
        tattoos: includeTattoos,
      },
    });
  }
}
