import prisma from "@/lib/prismadb";


// given a user id, it returns an array with the complete data of the saved tattoos
export async function getTattoosByBoardId(boardId) {

    const boardTattoos = await prisma.boardTattoo.findMany({
        where: {
            boardId: boardId
        },
        include: {
            tattoo: true
        }
    })


    const tattoosArray = boardTattoos.map(boardTattoo => boardTattoo.tattoo)


    return tattoosArray
}