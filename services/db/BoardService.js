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

  static async deleteById(boardId) {
    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
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
    const deletedTattoo = prisma.boardTattoo.delete({
      where: {
        boardId_tattooId: {
          boardId,
          tattooId,
        },
      },
    });

    return deletedTattoo;
  }

  static async getByTitleAndUserId(title, userId) {
    const board = await prisma.board.findFirst({
      where: { title, userId },
    });
    return board;
  }

  static async create({ title, userId }) {
    const newBoard = await prisma.board.create({
      data: {
        title,
        user: {
          connect: { id: userId },
        },
      },
    });

    return newBoard;
  }

  static async getByUserId(userId, { includeTattoos = false }) {
    const boards = await prisma.board.findMany({
      where: {
        userId: userId,
      },
      include: {
        tattoos: includeTattoos,
      },
    });
    return boards;
  }
}
