import prisma from "@/lib/prismadb";

// get all the boards of the current user
export async function getBoardsOfUser(user) {

    try {

        if (!user) {
            return null;
        }

        const boards = await prisma.tattooBoard.findMany({
            where: {
                userId: user.id
            },
            include: {
                tattoos: true
            }
        }
        );

        if (!boards) {
            return [];
        }

        return boards;
    } catch (error) {
        console.log("ERROR - getBoardsOfUser", error)
        return [];
    }

}


