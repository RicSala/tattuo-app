import { getCurrentUser } from '@/actions/getCurrentUser';
import as from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {

    const boardId = params.boardId

    try {
        const body = await req.json();

        const user = await getCurrentUser();

        const board = await as.board.findFirst({
            where: {
                id: boardId
            }
        })


        if (!board) {
            console.log("Board does not exist")
            return NextResponse.json({ error: 'Board does not exist' }, { status: 400 })
        }

        // check if the tattoo is already in the board
        // const tattooAlreadyInBoard = await prisma.boardTattoo.findFirst({
        //     where: {
        //         boardId: boardId,
        //         tattooId: body.tattooId
        //     }
        // })

        // if (tattooAlreadyInBoard) {
        //     console.log("Tattoo already in board")
        //     return NextResponse.json({ error: 'Tattoo already in board' }, { status: 400 })
        // }


        // Add the tattoo to the board
        console.log("Board found 🟩. Adding tattoo...")
        const updatedBoard = await as.boardTattoo.create({
            data: {
                board: {
                    connect: {
                        id: boardId
                    }
                },
                tattoo: {
                    connect: {
                        id: body.tattooId
                    }
                }
            }
        })


        return NextResponse.json(updatedBoard);

    } catch (error) {
        console.log(error, 'ADD TATTTOO TO BOARD_ERROR');
        console.log(error.code, '<---here');
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Ese tatuaje ya está en el tablero' }, { status: 500 })
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    const boardId = params.boardId

    // get the tattooId from the body

    try {
        const body = await req.json();
        // delete the tattoo from the board by delete the instance of boardTattoo that connects them
        const deletedBoardTattoo = await as.boardTattoo.delete({
            where: {
                boardId_tattooId: {
                    boardId: boardId,
                    tattooId: body.tattooId
                }
            }
        })

        return NextResponse.json(deletedBoardTattoo);

    } catch (error) {

        console.log(error, 'DELETE TATTOO FROM BOARD_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}

