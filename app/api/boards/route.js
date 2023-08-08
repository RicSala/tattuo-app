import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req) {

    try {
        const body = await req.json();

        const user = await getCurrentUser();

        // check if the a board with the same title and the same user already exists
        const board = await prisma.board.findFirst({
            where: {
                title: body.title,
                userId: user.id
            }
        })


        if (board) {
            console.log("Board Already exist")
            return NextResponse.json({ error: 'Board already exists' }, { status: 400 })
        }

        // TODO: User -> user
        console.log("Board NOT found 🟩. Creating...")
        const newBoard = await prisma.board.create({
            data: {
                title: body.title,
                user: {
                    connect:
                        { id: user.id }
                }
            }
        })
        console.log("Board created 🟩")

        return NextResponse.json(newBoard);

    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET(req) {

    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const boards = await prisma.board.findMany({
            where: {
                userId: user.id
            },
            include: {
                tattoos: true
            }
        })

        if (boards.length === 0 || !boards) {
            return NextResponse.json({ boards: [] })
        }

        return NextResponse.json(boards);

    } catch (error) {
        console.log(error, 'GET_BOARDS_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}