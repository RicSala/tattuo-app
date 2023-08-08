import prisma from "@/lib/prismadb";


// given a board id, it returns the board completed data, including the artist profile
export async function getBoardById(boardId) {

    try {

        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
            },
            include: {
                tattoos: {
                    include: {
                        tattoo: true
                    }
                }
            }
        });

        if (!board) {
            return null;
        }

        return board

    } catch (error) {

        return null;
    }
}

